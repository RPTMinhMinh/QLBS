package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import vn.edu.hunre.qlbs.model.dto.RoleDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface IRoleService {
    ResponsePage<List<RoleDto>> getAllRoles(Pageable pageable);
    BaseResponse<RoleDto> addRole(RoleDto role);
    BaseResponse<RoleDto> updateRole(RoleDto role, Long id);
    BaseResponse<RoleDto> deleteRole(Long id);
    BaseResponse<RoleDto> getRoleById(Long id);
}
