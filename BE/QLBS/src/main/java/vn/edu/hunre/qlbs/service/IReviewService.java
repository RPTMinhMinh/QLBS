package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import vn.edu.hunre.qlbs.model.dto.ReviewDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface IReviewService {
    ResponsePage<List<ReviewDto>> getAllReviews(Pageable pageable);
    BaseResponse<ReviewDto> addReview(ReviewDto reviewDto);
    BaseResponse<ReviewDto> updateReview(ReviewDto reviewDto, Long id);
    BaseResponse<ReviewDto> deleteReview(Long id);
    BaseResponse<ReviewDto> getReviewById(Long id);
    ResponsePage<List<ReviewDto>> getAllByBookId(Long bookId, Pageable pageable);
    BaseResponse<Boolean> checkReview(Long bookId);
    BaseResponse<Boolean> checkHasReview(Long bookId);
    BaseResponse<Long> countReview();
}
