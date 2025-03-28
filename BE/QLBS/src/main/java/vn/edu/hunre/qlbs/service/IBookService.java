package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;
import java.util.Map;

public interface IBookService {
    ResponsePage<List<BookDto>> getAllBooks(Pageable pageable);
    BaseResponse<BookDto> addBook(BookDto bookDto, MultipartFile file);
    BaseResponse<BookDto> updateBook(BookDto bookDto, Long id, MultipartFile file);
    BaseResponse<BookDto> deleteBook(Long id);
    BaseResponse<BookDto> getBookById(Long id);
    ResponsePage<List<BookDto>> getBookByCondition(Map<String, String> params, Pageable pageable);
    BaseResponse<List<BookDto>> getBookByName(String name);
    BaseResponse<List<BookDto>> bestSellerBook();
    BaseResponse<List<BookDto>> newArrivedBook();
    BaseResponse<List<BookDto>> discountBook(Integer discount);
    ResponsePage<List<BookDto>> findByPriceRange(Double minPrice, Double maxPrice, Pageable pageable);
    BaseResponse<Long> getBookCount();
}
