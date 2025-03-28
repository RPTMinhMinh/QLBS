package vn.edu.hunre.qlbs.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.CategoryEntity;
import vn.edu.hunre.qlbs.entity.ImageEntity;
import vn.edu.hunre.qlbs.entity.PublisherEntity;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.repository.CategoryRepository;
import vn.edu.hunre.qlbs.repository.ImageRepository;
import vn.edu.hunre.qlbs.repository.PublisherRepository;

import java.awt.print.Book;
@Component
public class BookMapper {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private ImageRepository imageRepository;
    public BookEntity toEntity(BookDto bookDto) {
        BookEntity bookEntity = new BookEntity();
        bookEntity.setId(bookDto.getId());
        bookEntity.setCode(bookDto.getCode());
        bookEntity.setName(bookDto.getName());
        bookEntity.setAuthor(bookDto.getAuthor());
        bookEntity.setPrice(bookDto.getPrice());
        bookEntity.setImportPrice(bookDto.getImportPrice());
        bookEntity.setQuantity(bookDto.getQuantity());
        bookEntity.setDiscount(bookDto.getDiscount());
        bookEntity.setDescription(bookDto.getDescription());
        CategoryEntity categoryEntity = categoryRepository.findById(bookDto.getCategoryId()).orElse(null);
        if (categoryEntity != null) {
            bookEntity.setCategoryEntity(categoryEntity);
        }
        PublisherEntity publisherEntity = publisherRepository.findById(bookDto.getPublisherId()).orElse(null);
        if (publisherEntity != null) {
            bookEntity.setPublisherEntity(publisherEntity);
        }
        return bookEntity;
    }

    public BookDto toDto(BookEntity bookEntity) {
        BookDto bookDto = new BookDto();
        bookDto.setId(bookEntity.getId());
        bookDto.setCode(bookEntity.getCode());
        bookDto.setName(bookEntity.getName());
        bookDto.setAuthor(bookEntity.getAuthor());
        bookDto.setPrice(bookEntity.getPrice());
        bookDto.setImportPrice(bookEntity.getImportPrice());
        bookDto.setQuantity(bookEntity.getQuantity());
        bookDto.setDiscount(bookEntity.getDiscount());
        bookDto.setDescription(bookEntity.getDescription());
        bookDto.setCategoryId(bookEntity.getCategoryEntity().getId());
        bookDto.setCategoryName(bookEntity.getCategoryEntity().getName());
        bookDto.setPublisherId(bookEntity.getPublisherEntity().getId());
        bookDto.setPublisherName(bookEntity.getPublisherEntity().getName());
        ImageEntity imageEntity = imageRepository.findByBookId(bookDto.getId());
        if (imageEntity != null) {
            bookDto.setImageUrl(imageEntity.getUrl());
        }
        return bookDto;
    }
}
