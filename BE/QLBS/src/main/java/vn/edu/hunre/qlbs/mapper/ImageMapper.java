package vn.edu.hunre.qlbs.mapper;

import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.ImageEntity;
import vn.edu.hunre.qlbs.model.dto.ImageDto;
@Component
public class ImageMapper {
    public ImageEntity toEntity(ImageDto imageDto){
        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setId(imageDto.getId());
        imageEntity.setUrl(imageDto.getUrl());
        imageEntity.setType(imageDto.getType());
        imageEntity.setPublicId(imageDto.getPublicId());
        return imageEntity;
    }
    public ImageDto toDto(ImageEntity imageEntity){
        ImageDto imageDto = new ImageDto();
        imageDto.setId(imageEntity.getId());
        imageDto.setUrl(imageEntity.getUrl());
        imageDto.setType(imageEntity.getType());
        imageDto.setPublicId(imageEntity.getPublicId());
        return imageDto;
    }
}
