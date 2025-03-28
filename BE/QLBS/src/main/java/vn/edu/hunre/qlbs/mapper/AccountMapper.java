package vn.edu.hunre.qlbs.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.entity.ImageEntity;
import vn.edu.hunre.qlbs.entity.RoleEntity;
import vn.edu.hunre.qlbs.model.dto.AccountDto;
import vn.edu.hunre.qlbs.repository.ImageRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AccountMapper {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private RoleMapper roleMapper;
    public AccountDto toDto(AccountEntity userEntity) {
        AccountDto dto = new AccountDto();
        dto.setId(userEntity.getId());
        dto.setFullname(userEntity.getFullname());
        dto.setPhone(userEntity.getPhone());
        dto.setEmail(userEntity.getEmail());
        dto.setAddress(userEntity.getAddress());
        dto.setEnabled(userEntity.isEnabled());
        dto.setRoles(userEntity.getRoles()
                .stream()
                .map(roleMapper::toDto)
                .collect(Collectors.toSet()));
        ImageEntity images = imageRepository.findByAccountId(dto.getId());
        if (images != null) {
            dto.setImageUrl(images.getUrl());
        }
        Set<Long> roleId = userEntity.getRoles().stream().map(RoleEntity::getId).collect(Collectors.toSet());
        dto.setRoleIds(roleId);
        return dto;
    }


}