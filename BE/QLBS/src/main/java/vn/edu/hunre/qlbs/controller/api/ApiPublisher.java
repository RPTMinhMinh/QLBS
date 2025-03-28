package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.PublisherDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.IPublisherService;

import java.util.List;

@RestController
@RequestMapping("/api/publisher")
public class ApiPublisher {
    @Autowired
    private IPublisherService publisherService;
    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<PublisherDto>>> getAll(Pageable pageable){
        ResponsePage<List<PublisherDto>> responsePage = publisherService.getAllPublishers(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping("/create")
    public ResponseEntity<BaseResponse<PublisherDto>> create(@RequestBody PublisherDto publisherDto){
        BaseResponse<PublisherDto> response = publisherService.addPublisher(publisherDto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<PublisherDto>> update(@PathVariable Long id, @RequestBody PublisherDto publisherDto){
        BaseResponse<PublisherDto> response = publisherService.updatePublisher(publisherDto, id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<PublisherDto>> delete(@PathVariable Long id){
        BaseResponse<PublisherDto> response = publisherService.deletePublisher(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<PublisherDto>> findById(@PathVariable Long id){
        BaseResponse<PublisherDto> response = publisherService.getPublisherById(id);
        return ResponseEntity.ok(response);
    }
}
