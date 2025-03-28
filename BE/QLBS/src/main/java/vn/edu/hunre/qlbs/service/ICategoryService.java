package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import vn.edu.hunre.qlbs.model.dto.CategoryDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface ICategoryService {
    ResponsePage<List<CategoryDto>> getAllCategories(Pageable pageable);
    BaseResponse<CategoryDto> addCategory(CategoryDto categoryDto);
    BaseResponse<CategoryDto> updateCategory(Long id, CategoryDto categoryDto);
    BaseResponse<CategoryDto> deleteCategory(Long id);
    BaseResponse<CategoryDto> getCategoryById(Long id);
}
