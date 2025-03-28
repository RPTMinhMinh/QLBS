package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.CategoryEntity;
import vn.edu.hunre.qlbs.mapper.CategoryMapper;
import vn.edu.hunre.qlbs.model.dto.CategoryDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.CategoryRepository;
import vn.edu.hunre.qlbs.service.ICategoryService;
import vn.edu.hunre.qlbs.utils.Constant;
import vn.edu.hunre.qlbs.utils.GenerateCode;
import vn.edu.hunre.qlbs.utils.Utils;

import java.util.List;
import java.util.Optional;

@Service
public class ICategoryServiceImpl implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryMapper categoryMapper;
    @Override
    public ResponsePage<List<CategoryDto>> getAllCategories(Pageable pageable) {
        ResponsePage<List<CategoryDto>> responsePage = new ResponsePage<>();
        Page<CategoryEntity> page = categoryRepository.getAllCategory(pageable);
        List<CategoryDto> categoryDtos = page.getContent().stream().map(categoryMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(categoryDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<CategoryDto> addCategory(CategoryDto categoryDto) {
        BaseResponse<CategoryDto> response = new BaseResponse<>();
        Optional<CategoryEntity> checkCode = categoryRepository.findByCode(categoryDto.getCode());
        if (checkCode.isPresent()) {
            response.setCode(HttpStatus.CONFLICT.value());
            response.setMessage("Code already exist");
            return response;
        }
        Optional<CategoryEntity> checkName = categoryRepository.findByName(categoryDto.getName());
        if (checkName.isPresent()) {
            response.setCode(HttpStatus.CONFLICT.value());
            response.setMessage("Name already exist");
            return response;
        }
        CategoryEntity category = categoryMapper.toEntity(categoryDto);
        category.setCode(GenerateCode.generateUniqueCode("CATE"));
        category.setDeleted(false);
        category = categoryRepository.save(category);
        response.setCode(HttpStatus.CREATED.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(categoryMapper.toDto(category));
        return response;
    }

    @Override
    public BaseResponse<CategoryDto> updateCategory(Long id, CategoryDto categoryDto) {
        BaseResponse<CategoryDto> response =  new BaseResponse<>();

        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if(category.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Category not found");
            return response;
        }
        CategoryEntity currentCategory = category.get();
        if (!currentCategory.getCode().equals(categoryDto.getCode())) {
            Optional<CategoryEntity> checkCode = categoryRepository.findByCode(categoryDto.getCode());
            if (checkCode.isPresent()) {
                response.setCode(HttpStatus.CONFLICT.value());
                response.setMessage("Code already exist");
                return response;
            }
        }

        if (!currentCategory.getName().equals(categoryDto.getName())){
            Optional<CategoryEntity> checkName = categoryRepository.findByName(categoryDto.getName());
            if (checkName.isPresent()) {
                response.setCode(HttpStatus.CONFLICT.value());
                response.setMessage("Name already exist");
                return response;
            }
        }
        currentCategory.setName(categoryDto.getName());
        currentCategory.setDeleted(false);
        currentCategory.setId(id);
        currentCategory = categoryRepository.save(currentCategory);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(categoryMapper.toDto(currentCategory));

        return response;
    }

    @Override
    public BaseResponse<CategoryDto> deleteCategory(Long id) {
        BaseResponse<CategoryDto> response = new BaseResponse<>();

        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if(category.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        CategoryEntity categoryEntity = category.get();
        categoryEntity.setDeleted(true);
        categoryRepository.save(categoryEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(categoryMapper.toDto(categoryEntity));
        return response;
    }

    @Override
    public BaseResponse<CategoryDto> getCategoryById(Long id) {
        BaseResponse<CategoryDto> response = new BaseResponse<>();
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if(category.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        CategoryDto categoryDto = categoryMapper.toDto(category.get());
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(categoryDto);
        return response;

    }
}
