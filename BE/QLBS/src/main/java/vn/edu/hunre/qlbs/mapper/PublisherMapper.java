package vn.edu.hunre.qlbs.mapper;

import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.PublisherEntity;
import vn.edu.hunre.qlbs.model.dto.PublisherDto;
@Component
public class PublisherMapper {
    public PublisherDto toDto(PublisherEntity publisherEntity){
        PublisherDto publisherDto = new PublisherDto();
        publisherDto.setId(publisherEntity.getId());
        publisherDto.setCode(publisherEntity.getCode());
        publisherDto.setName(publisherEntity.getName());
        publisherDto.setAddress(publisherEntity.getAddress());
        return publisherDto;
    }
    public PublisherEntity toEntity(PublisherDto publisherDto){
        PublisherEntity publisherEntity = new PublisherEntity();
        publisherEntity.setId(publisherDto.getId());
        publisherEntity.setCode(publisherDto.getCode());
        publisherEntity.setName(publisherDto.getName());
        publisherEntity.setAddress(publisherDto.getAddress());
        return publisherEntity;
    }
}
