package vn.edu.hunre.qlbs.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.RoleEntity;
import vn.edu.hunre.qlbs.mapper.RoleMapper;
import vn.edu.hunre.qlbs.model.dto.RoleDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.RoleRepository;
import vn.edu.hunre.qlbs.service.IRoleService;
import vn.edu.hunre.qlbs.utils.Constant;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class IRoleServiceImpl implements IRoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;

    @Override
    public ResponsePage<List<RoleDto>> getAllRoles(Pageable pageable) {
        ResponsePage<List<RoleDto>> responsePage = new ResponsePage<>();
        Page<RoleEntity> roles = roleRepository.findAll(pageable);
        List<RoleDto> roleDtos = roles.getContent().stream().map(roleMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(roles.getTotalElements());
        responsePage.setTotalPages(roles.getTotalPages());
        responsePage.setContent(roleDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<RoleDto> addRole(RoleDto role) {
        BaseResponse<RoleDto> response = new BaseResponse();
        Optional<RoleEntity> existingRole = roleRepository.findByCode(role.getCode());
        if (existingRole.isPresent()) {
            response.setCode(HttpStatus.CONFLICT.value());
            response.setMessage("Role already exists");
            return response;
        }

        RoleEntity roleEntity = roleMapper.toEntity(role);
        roleEntity.setCode(roleEntity.getName().toUpperCase());
        roleEntity.setDeleted(false);
        roleEntity = roleRepository.save(roleEntity);
        role.setId(roleEntity.getId());
        response.setData(roleMapper.toDto(roleEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<RoleDto> updateRole(RoleDto role, Long id) {
        BaseResponse<RoleDto> response = new BaseResponse<>();
        Optional<RoleEntity> roleEntity = roleRepository.findById(id);
        if(roleEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }

        RoleEntity roleEntity1 = roleEntity.get();
        roleEntity1.setId(id);
        roleEntity1.setName(role.getName());
        roleEntity1.setDeleted(false);
        roleEntity1 = roleRepository.save(roleEntity1);
        response.setData(roleMapper.toDto(roleEntity1));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);

        return response;
    }

    @Override
    public BaseResponse<RoleDto> deleteRole(Long id) {
        BaseResponse<RoleDto> response = new BaseResponse<>();
        Optional<RoleEntity> roleEntity = roleRepository.findById(id);
        if(roleEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }

        RoleEntity roleEntity1 = roleEntity.get();
        roleEntity1.setDeleted(true);
        roleRepository.save(roleEntity1);
        response.setData(roleMapper.toDto(roleEntity1));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<RoleDto> getRoleById(Long id) {
        BaseResponse<RoleDto> response = new BaseResponse<>();
        Optional<RoleEntity> roleEntity = roleRepository.findById(id);
        if(roleEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }

        RoleEntity roleEntity1 = roleEntity.get();
        response.setData(roleMapper.toDto(roleEntity1));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    public Set<RoleEntity> findByRoleCode(Set<String> roleCodes) {
        Set<RoleEntity> roleEntities = new HashSet<>();
        for (String roleCode : roleCodes) {
            roleCode = roleCode.trim();
            RoleEntity roleEntity = roleRepository.findByCode(roleCode).orElseThrow(() -> new RuntimeException("Role not found"));
            roleEntities.add(roleEntity);
        }
        return roleEntities;
    }
}
