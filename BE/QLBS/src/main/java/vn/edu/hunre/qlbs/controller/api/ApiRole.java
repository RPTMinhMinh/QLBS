package vn.edu.hunre.qlbs.controller.api;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.RoleDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.IRoleService;

import java.util.List;

@RestController
@RequestMapping("/api/role")
@CrossOrigin(origins = {"http://localhost:3000/", "http://localhost:3001"})
public class ApiRole {
    @Autowired
    private IRoleService roleService;
    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<RoleDto>>> getAll(Pageable pageable) {
        ResponsePage<List<RoleDto>> responsePage = roleService.getAllRoles(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<RoleDto>> createRole( @RequestBody RoleDto roleDto) {
        BaseResponse<RoleDto> baseResponse = roleService.addRole(roleDto);
        return  ResponseEntity.ok(baseResponse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<RoleDto>> updateRole( @RequestBody RoleDto roleDto, @PathVariable Long id) {
        BaseResponse<RoleDto> baseResponse = roleService.updateRole(roleDto, id);
        return ResponseEntity.ok(baseResponse);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<RoleDto>> getRoleById(@PathVariable Long id) {
        BaseResponse<RoleDto> response = roleService.getRoleById(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<RoleDto>> deleteRole(@PathVariable Long id) {
        BaseResponse<RoleDto> response = roleService.deleteRole(id);
        return ResponseEntity.ok(response);
    }
}
