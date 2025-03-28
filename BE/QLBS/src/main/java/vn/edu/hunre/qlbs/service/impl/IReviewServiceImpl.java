package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.ReviewEntity;
import vn.edu.hunre.qlbs.mapper.ReviewMapper;
import vn.edu.hunre.qlbs.model.dto.ReviewDto;
import vn.edu.hunre.qlbs.model.dto.auth.AuthDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.BookRepository;
import vn.edu.hunre.qlbs.repository.OrderDetailRepository;
import vn.edu.hunre.qlbs.repository.ReviewRepository;
import vn.edu.hunre.qlbs.security.service.JwtService;
import vn.edu.hunre.qlbs.service.IReviewService;
import vn.edu.hunre.qlbs.utils.Constant;

import java.util.List;
import java.util.Optional;

@Service
public class IReviewServiceImpl implements IReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ReviewMapper reviewMapper;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public ResponsePage<List<ReviewDto>> getAllReviews(Pageable pageable) {
        ResponsePage<List<ReviewDto>> responsePage = new ResponsePage<>();
        Page<ReviewEntity> page = reviewRepository.getAll(pageable);
        List<ReviewDto> reviewDtos = page.getContent().stream().map(reviewMapper::toDto).toList();
        responsePage.setPageNumber(page.getNumber());
        responsePage.setPageSize(page.getSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(reviewDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<ReviewDto> addReview(ReviewDto reviewDto) {
        BaseResponse<ReviewDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        ReviewEntity reviewEntity = reviewMapper.toEntity(reviewDto,email);
        reviewEntity.setDeleted(false);
        reviewRepository.save(reviewEntity);
        response.setData(reviewMapper.toDto(reviewEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<ReviewDto> updateReview(ReviewDto reviewDto, Long id) {
        BaseResponse<ReviewDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Optional<ReviewEntity> optional = reviewRepository.findByIdReview(email,id);
        if (optional.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("REVIEW NOT FOUND");
            return response;
        }
        Optional<BookEntity> book =  bookRepository.findById(reviewDto.getBookId());
        ReviewEntity reviewEntity = optional.get();
        reviewEntity.setRate(reviewDto.getRating());
        reviewEntity.setComment(reviewDto.getComment());
        reviewEntity.setBookEntity(book.get());
        reviewEntity.setDeleted(false);
        reviewRepository.save(reviewEntity);
        response.setData(reviewMapper.toDto(reviewEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<ReviewDto> deleteReview(Long id) {
        BaseResponse<ReviewDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Optional<ReviewEntity> optional = reviewRepository.findByIdReview(email,id);
        if (optional.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("REVIEW NOT FOUND");
            return response;
        }
        ReviewEntity reviewEntity = optional.get();
        reviewEntity.setDeleted(true);
        reviewRepository.save(reviewEntity);
        response.setData(reviewMapper.toDto(reviewEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<ReviewDto> getReviewById(Long id) {
        BaseResponse<ReviewDto> response = new BaseResponse<>();
        Optional<ReviewEntity> optional = reviewRepository.findById(id);
        if (optional.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("REVIEW NOT FOUND");
            return response;
        }
        ReviewEntity reviewEntity = optional.get();
        response.setData(reviewMapper.toDto(reviewEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public ResponsePage<List<ReviewDto>> getAllByBookId(Long bookId, Pageable pageable) {
        ResponsePage<List<ReviewDto>> responsePage = new ResponsePage<>();
        Page<ReviewEntity> page = reviewRepository.getAllByBookId(bookId, pageable);
        List<ReviewDto> reviewDtos = page.getContent().stream().map(reviewMapper::toDto).toList();
        responsePage.setPageNumber(page.getNumber());
        responsePage.setPageSize(page.getSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(reviewDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<Boolean> checkReview(Long bookId) {
        BaseResponse<Boolean> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Boolean check = orderDetailRepository.check(bookId,email).isPresent();
        response.setData(check);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<Boolean> checkHasReview(Long bookId) {
        BaseResponse<Boolean> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Boolean check = reviewRepository.checkHasReview(email,bookId).isPresent();
        response.setData(check);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<Long> countReview() {
        BaseResponse<Long> response = new BaseResponse<>();
        Long count = reviewRepository.countReview();
        response.setData(count);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

}
