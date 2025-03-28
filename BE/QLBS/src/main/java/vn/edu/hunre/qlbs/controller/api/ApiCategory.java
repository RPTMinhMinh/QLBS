package vn.edu.hunre.qlbs.controller.api;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.CategoryDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.ICategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class ApiCategory {
    @Autowired
    private ICategoryService categoryService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<CategoryDto>>> getAll(Pageable pageable) {
        ResponsePage<List<CategoryDto>> responsePage = categoryService.getAllCategories(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<CategoryDto>> create( @RequestBody CategoryDto categoryDto) {
        BaseResponse<CategoryDto> category = categoryService.addCategory(categoryDto);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CategoryDto>> update( @RequestBody CategoryDto categoryDto, @PathVariable Long id) {
        BaseResponse<CategoryDto> category = categoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<CategoryDto>> delete(@PathVariable Long id) {
        BaseResponse<CategoryDto> category = categoryService.deleteCategory(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<CategoryDto>> findById(@PathVariable Long id) {
        BaseResponse<CategoryDto> category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
}
