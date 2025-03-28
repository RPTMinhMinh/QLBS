package vn.edu.hunre.qlbs.mapper;

import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.CategoryEntity;
import vn.edu.hunre.qlbs.model.dto.CategoryDto;
@Component
public class CategoryMapper {
    public CategoryDto toDto(CategoryEntity categoryEntity) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(categoryEntity.getId());
        categoryDto.setCode(categoryEntity.getCode());
        categoryDto.setName(categoryEntity.getName());
        return categoryDto;
    }
    public CategoryEntity toEntity(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(categoryDto.getId());
        categoryEntity.setCode(categoryDto.getCode());
        categoryEntity.setName(categoryDto.getName());
        return categoryEntity;
    }
}
