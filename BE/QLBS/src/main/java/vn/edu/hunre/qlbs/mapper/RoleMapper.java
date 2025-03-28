package vn.edu.hunre.qlbs.mapper;

import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.RoleEntity;
import vn.edu.hunre.qlbs.model.dto.RoleDto;

@Component
public class RoleMapper {
    public RoleDto toDto(RoleEntity roleEntity) {
        RoleDto Dto = new RoleDto();
        Dto.setId(roleEntity.getId());
        Dto.setCode(roleEntity.getCode());
        Dto.setName(roleEntity.getName());
        return Dto;
    }
    public RoleEntity toEntity(RoleDto Dto) {
        RoleEntity entity = new RoleEntity();
        entity.setId(Dto.getId());
        entity.setCode(Dto.getCode());
        entity.setName(Dto.getName());
        return entity;
    }
}
