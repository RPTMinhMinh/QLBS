package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.ReviewDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.IReviewService;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ApiReview {
    @Autowired
    private IReviewService reviewService;
    
    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<ReviewDto>>> getAll(Pageable pageable){
        ResponsePage<List<ReviewDto>> responsePage = reviewService.getAllReviews(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping("/create")
    public ResponseEntity<BaseResponse<ReviewDto>> create(@RequestBody ReviewDto ReviewDto){
        BaseResponse<ReviewDto> response = reviewService.addReview(ReviewDto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<ReviewDto>> update(@PathVariable Long id, @RequestBody ReviewDto ReviewDto){
        BaseResponse<ReviewDto> response = reviewService.updateReview(ReviewDto, id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<ReviewDto>> delete(@PathVariable Long id){
        BaseResponse<ReviewDto> response = reviewService.deleteReview(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<ReviewDto>> findById(@PathVariable Long id){
        BaseResponse<ReviewDto> response = reviewService.getReviewById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getReviewByBook/{id}")
    public ResponseEntity<ResponsePage<List<ReviewDto>>> getReviewByBook(@PathVariable Long id,Pageable pageable){
        ResponsePage<List<ReviewDto>> response = reviewService.getAllByBookId(id, pageable);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/checkReview/{bookId}")
    public ResponseEntity<BaseResponse<Boolean>> checkReview(@PathVariable Long bookId){
        BaseResponse<Boolean> response = reviewService.checkReview(bookId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/checkHasReview/{bookId}")
    public ResponseEntity<BaseResponse<Boolean>> checkHasReview(@PathVariable Long bookId){
        BaseResponse<Boolean> response = reviewService.checkHasReview(bookId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count-review")
    public ResponseEntity<BaseResponse<Long>> countReview(){
        BaseResponse<Long> response = reviewService.countReview();
        return ResponseEntity.ok(response);
    }
}
