package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import vn.edu.hunre.qlbs.model.dto.PublisherDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface IPublisherService {
    ResponsePage<List<PublisherDto>> getAllPublishers(Pageable pageable);
    BaseResponse<PublisherDto> addPublisher(PublisherDto publisherDto);
    BaseResponse<PublisherDto> updatePublisher(PublisherDto publisherDto, Long id);
    BaseResponse<PublisherDto> deletePublisher(Long id);
    BaseResponse<PublisherDto> getPublisherById(Long id);
}
