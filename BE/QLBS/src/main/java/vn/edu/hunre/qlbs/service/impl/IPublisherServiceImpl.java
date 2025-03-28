package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.PublisherEntity;
import vn.edu.hunre.qlbs.mapper.PublisherMapper;
import vn.edu.hunre.qlbs.model.dto.PublisherDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.PublisherRepository;
import vn.edu.hunre.qlbs.service.IPublisherService;
import vn.edu.hunre.qlbs.utils.Constant;
import vn.edu.hunre.qlbs.utils.GenerateCode;

import java.util.List;
import java.util.Optional;

@Service
public class IPublisherServiceImpl implements IPublisherService {
    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private PublisherMapper publisherMapper;
    @Override
    public ResponsePage<List<PublisherDto>> getAllPublishers(Pageable pageable) {
        ResponsePage<List<PublisherDto>> responsePage = new ResponsePage<>();
        Page<PublisherEntity> page = publisherRepository.getAll(pageable);
        List<PublisherDto> publisherDtos = page.getContent().stream().map(publisherMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(publisherDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<PublisherDto> addPublisher(PublisherDto publisherDto) {
        BaseResponse<PublisherDto> response = new BaseResponse<>();
        PublisherEntity publisherEntity = publisherMapper.toEntity(publisherDto);
        publisherEntity.setCode(GenerateCode.generateUniqueCode("P"));
        publisherEntity.setDeleted(false);
        publisherRepository.save(publisherEntity);
        response.setData(publisherMapper.toDto(publisherEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<PublisherDto> updatePublisher(PublisherDto publisherDto, Long id) {
        BaseResponse<PublisherDto> response = new BaseResponse<>();
        Optional<PublisherEntity> publisher = publisherRepository.findById(id);
        if (publisher.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Publisher not found");
            return response;
        }
        PublisherEntity publisherEntity = publisher.get();
        publisherEntity.setName(publisherDto.getName());
        publisherEntity.setAddress(publisherDto.getAddress());
        publisherEntity.setDeleted(false);
        publisherRepository.save(publisherEntity);
        response.setData(publisherMapper.toDto(publisherEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<PublisherDto> deletePublisher(Long id) {
        BaseResponse<PublisherDto> response = new BaseResponse<>();
        Optional<PublisherEntity> publisher = publisherRepository.findById(id);
        if (publisher.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Publisher not found");
            return response;
        }
        PublisherEntity publisherEntity = publisher.get();
        publisherEntity.setDeleted(true);
        publisherRepository.save(publisherEntity);
        response.setData(publisherMapper.toDto(publisherEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<PublisherDto> getPublisherById(Long id) {
        BaseResponse<PublisherDto> response = new BaseResponse<>();
        Optional<PublisherEntity> publisher = publisherRepository.findById(id);
        if (publisher.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Publisher not found");
            return response;
        }
        PublisherEntity publisherEntity = publisher.get();
        response.setData(publisherMapper.toDto(publisherEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
