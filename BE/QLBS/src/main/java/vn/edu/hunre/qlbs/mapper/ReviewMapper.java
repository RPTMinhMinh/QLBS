package vn.edu.hunre.qlbs.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.ImageEntity;
import vn.edu.hunre.qlbs.entity.ReviewEntity;
import vn.edu.hunre.qlbs.model.dto.AccountDto;
import vn.edu.hunre.qlbs.model.dto.ImageDto;
import vn.edu.hunre.qlbs.model.dto.ReviewDto;
import vn.edu.hunre.qlbs.repository.AccountRepository;
import vn.edu.hunre.qlbs.repository.BookRepository;
import vn.edu.hunre.qlbs.repository.ImageRepository;

import java.io.IOException;

@Component
public class ReviewMapper {
    @Autowired
    private AccountRepository accountRepositoryl;
    @Autowired
    private BookRepository bookRepositoryl;
    @Autowired
    private ImageRepository imageRepository;

    public ReviewEntity toEntity(ReviewDto reviewDto, String email) {
        ReviewEntity reviewEntity = new ReviewEntity();
        reviewEntity.setId(reviewDto.getId());
        reviewEntity.setRate(reviewDto.getRating());
        reviewEntity.setComment(reviewDto.getComment());
        AccountEntity account = accountRepositoryl.findByEmail(email).orElse(null);
        reviewEntity.setAccountEntity(account);
        BookEntity book = bookRepositoryl.findById(reviewDto.getBookId()).orElse(null);
        reviewEntity.setBookEntity(book);
        return reviewEntity;
    }

    public ReviewDto toDto(ReviewEntity reviewEntity) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setId(reviewEntity.getId());
        reviewDto.setRating(reviewEntity.getRate());
        reviewDto.setCreateDate(reviewEntity.getCreatedDate());
        ImageEntity imageEntity = imageRepository.findByAccountId(reviewEntity.getAccountEntity().getId());
        if (imageEntity != null) {
            reviewDto.setImageUrl(imageEntity.getUrl());
        }
        reviewDto.setComment(reviewEntity.getComment());
        reviewDto.setBookId(reviewEntity.getBookEntity().getId());
        reviewDto.setAccountName(reviewEntity.getAccountEntity().getFullname());
        reviewDto.setAccountId(reviewEntity.getAccountEntity().getId());
        reviewDto.setBookName(reviewEntity.getBookEntity().getName());
        return reviewDto;
    }
}
