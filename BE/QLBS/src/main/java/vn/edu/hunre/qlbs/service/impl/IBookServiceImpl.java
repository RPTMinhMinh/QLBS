package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.entity.*;
import vn.edu.hunre.qlbs.mapper.BookMapper;
import vn.edu.hunre.qlbs.mapper.ImageMapper;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.model.dto.ImageDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.BookRepository;
import vn.edu.hunre.qlbs.repository.CategoryRepository;
import vn.edu.hunre.qlbs.repository.ImageRepository;
import vn.edu.hunre.qlbs.repository.PublisherRepository;
import vn.edu.hunre.qlbs.service.IBookService;
import vn.edu.hunre.qlbs.service.IImageService;
import vn.edu.hunre.qlbs.utils.Constant;
import vn.edu.hunre.qlbs.utils.GenerateCode;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class IBookServiceImpl implements IBookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private IImageService iImageService;

    @Override
    public ResponsePage<List<BookDto>> getAllBooks(Pageable pageable) {
        ResponsePage<List<BookDto>> responsePage = new ResponsePage<>();
        Page<BookEntity> page = bookRepository.getAllBooks(pageable);
        List<BookDto> bookDtos = page.getContent().stream().map(bookMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(bookDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<BookDto> addBook(BookDto bookDto, MultipartFile file) {
        BaseResponse<BookDto> responsePage = new BaseResponse<>();
        BookEntity bookEntity = bookMapper.toEntity(bookDto);
        bookEntity.setCode(GenerateCode.generateUniqueCode("B"));
        bookEntity.setDeleted(false);
        bookRepository.save(bookEntity);
        bookDto.setId(bookEntity.getId());
        bookDto.setCode(bookEntity.getCode());
        try {
            if (file != null && !file.isEmpty()) {
                ImageDto imageDto = iImageService.uploadImage(file);
                ImageEntity imageEntity = imageMapper.toEntity(imageDto);
                imageEntity.setBookEntity(bookEntity);
                imageRepository.save(imageEntity);
                bookDto.setImageUrl(imageEntity.getUrl());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        responsePage.setCode(HttpStatus.OK.value());
        responsePage.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        responsePage.setData(bookDto);
        return responsePage;
    }

    @Override
    public BaseResponse<BookDto> updateBook(BookDto bookDto, Long id, MultipartFile file) {
        BaseResponse<BookDto> responsePage = new BaseResponse<>();
        Optional<BookEntity> book = bookRepository.findById(id);
        if (book.isEmpty()) {
            responsePage.setCode(HttpStatus.NOT_FOUND.value());
            responsePage.setMessage("Book not found");
            return responsePage;
        }
        Optional<CategoryEntity> category = categoryRepository.findById(bookDto.getCategoryId());
        if (category.isEmpty()) {
            responsePage.setCode(HttpStatus.NOT_FOUND.value());
            responsePage.setMessage("Category not found");
            return responsePage;
        }
        Optional<PublisherEntity> publisher = publisherRepository.findById(bookDto.getPublisherId());
        if (publisher.isEmpty()) {
            responsePage.setCode(HttpStatus.NOT_FOUND.value());
            responsePage.setMessage("Category not found");
            return responsePage;
        }
        BookEntity bookEntity = book.get();
        bookEntity.setName(bookDto.getName());
        bookEntity.setAuthor(bookDto.getAuthor());
        bookEntity.setPrice(bookDto.getPrice());
        bookEntity.setDeleted(false);
        bookEntity.setImportPrice(bookDto.getImportPrice());
        bookEntity.setQuantity(bookDto.getQuantity());
        bookEntity.setDiscount(bookDto.getDiscount());
        bookEntity.setDescription(bookDto.getDescription());
        bookEntity.setCategoryEntity(category.get());
        bookEntity.setPublisherEntity(publisher.get());
        bookRepository.save(bookEntity);
        ImageEntity imageEntity = imageRepository.findByBookId(bookEntity.getId());
        ImageDto imageDto = null;

        try {
            if (file != null && !file.isEmpty()) {
                if (imageEntity != null) {
                    iImageService.deleteImage(imageEntity.getPublicId());
                    imageDto = iImageService.uploadImage(file);
                    imageEntity.setUrl(imageDto.getUrl());
                    imageEntity.setType(file.getContentType());
                    imageEntity.setPublicId(imageDto.getPublicId());

                    imageRepository.save(imageEntity);
                    bookDto.setImageUrl(imageEntity.getUrl());
                } else {
                    bookDto.setImageUrl(bookDto.getImageUrl());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        BookDto bookDto1 = bookMapper.toDto(bookEntity);
        responsePage.setCode(HttpStatus.OK.value());
        responsePage.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        responsePage.setData(bookDto1);
        return responsePage;

    }

    @Override
    public BaseResponse<BookDto> deleteBook(Long id) {
        BaseResponse<BookDto> responsePage = new BaseResponse<>();
        Optional<BookEntity> book = bookRepository.findById(id);
        if (book.isEmpty()) {
            responsePage.setCode(HttpStatus.NOT_FOUND.value());
            responsePage.setMessage("Book not found");
            return responsePage;
        }
        BookEntity bookEntity = book.get();
        bookEntity.setDeleted(true);
        bookRepository.save(bookEntity);
        responsePage.setCode(HttpStatus.OK.value());
        responsePage.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        responsePage.setData(bookMapper.toDto(bookEntity));
        return responsePage;
    }

    @Override
    public BaseResponse<BookDto> getBookById(Long id) {
        BaseResponse<BookDto> responsePage = new BaseResponse<>();
        Optional<BookEntity> book = bookRepository.findById(id);
        if (book.isEmpty()) {
            responsePage.setCode(HttpStatus.NOT_FOUND.value());
            responsePage.setMessage("Book not found");
            return responsePage;
        }
        BookEntity bookEntity = book.get();
        responsePage.setCode(HttpStatus.OK.value());
        responsePage.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        responsePage.setData(bookMapper.toDto(bookEntity));
        return responsePage;
    }

    @Override
    public ResponsePage<List<BookDto>> getBookByCondition(Map<String, String> params, Pageable pageable) {
        ResponsePage<List<BookDto>> responsePage = new ResponsePage<>();
        String code = params.get("code");
        String name = params.get("name");
        String author = params.get("author");
        String category = params.get("category");
        String publisher = params.get("publisher");
        if (code == null || code.isEmpty()) {
            code = null;
        }
        if (name == null || name.isEmpty()) {
            name = null;
        }
        if (author == null || author.isEmpty()) {
            author = null;
        }
        Long categoryId = null;
        if (category != null && !category.isEmpty()) {
            try {
                categoryId = Long.parseLong(category);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid category ID format");
            }
        }

        Long publisherId = null;
        if (publisher != null && !publisher.isEmpty()) {
            try {
                publisherId = Long.parseLong(publisher);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid publisher ID format");
            }
        }

        Page<BookEntity> page = bookRepository.findByCondition(pageable, code, name, author, categoryId, publisherId);
        List<BookDto> bookDtos = page.getContent().stream().map(bookMapper::toDto).toList();

        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(bookDtos);

        return responsePage;
    }

    @Override
    public BaseResponse<List<BookDto>> getBookByName(String name) {
        BaseResponse<List<BookDto>> baseResponse = new BaseResponse<>();
        List<BookEntity> bookEntities = bookRepository.findByNameBook(name);
        List<BookDto> bookDtos = bookEntities.stream().map(bookMapper::toDto).toList();
        baseResponse.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        baseResponse.setCode(HttpStatus.OK.value());
        baseResponse.setData(bookDtos);
        return baseResponse;
    }

    @Override
    public BaseResponse<List<BookDto>> bestSellerBook() {
        BaseResponse<List<BookDto>> baseResponse = new BaseResponse<>();
        List<BookEntity> bookEntities = bookRepository.bestSellerBook();
        List<BookDto> bookDtos = bookEntities.stream().map(bookMapper::toDto).toList();
        baseResponse.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        baseResponse.setCode(HttpStatus.OK.value());
        baseResponse.setData(bookDtos);
        return baseResponse;
    }

    @Override
    public BaseResponse<List<BookDto>> newArrivedBook() {
        BaseResponse<List<BookDto>> response =  new BaseResponse<>();
        LocalDateTime dateTime = LocalDateTime.now().minusDays(5);
        List<BookEntity> bookEntities = bookRepository.newArrivedBook(dateTime);
        List<BookDto> bookDtos = bookEntities.stream().map(bookMapper::toDto).toList();
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        response.setData(bookDtos);
        return response;
    }

    @Override
    public BaseResponse<List<BookDto>> discountBook(Integer discount) {
        BaseResponse<List<BookDto>> response =  new BaseResponse<>();
        List<BookEntity> bookEntities = bookRepository.newDiscountedBook(discount);
        List<BookDto> bookDtos = bookEntities.stream().map(bookMapper::toDto).toList();
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        response.setData(bookDtos);
        return response;
    }

    @Override
    public ResponsePage<List<BookDto>> findByPriceRange(Double minPrice, Double maxPrice, Pageable pageable) {
        ResponsePage<List<BookDto>> responsePage = new ResponsePage<>();
        if(minPrice < 0 || maxPrice < 0 || maxPrice < minPrice){
            throw new IllegalArgumentException("Invalid range parameter");
        }
        Page<BookEntity> page = bookRepository.findBookInPriceRange(minPrice, maxPrice, pageable);
        List<BookDto> bookDtos = page.getContent().stream().map(bookMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(bookDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<Long> getBookCount() {
        BaseResponse<Long> response =  new BaseResponse<>();
        Long count = bookRepository.countBooks();
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        response.setData(count);
        return response;
    }
}
