package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.IBookService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
public class ApiBook {
    @Autowired
    private IBookService bookService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<BookDto>>> getAll(Pageable pageable){
        ResponsePage<List<BookDto>> responsePage = bookService.getAllBooks(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping("/create")
    public ResponseEntity<BaseResponse<BookDto>> create(@ModelAttribute BookDto bookDto,@RequestParam(value = "file") MultipartFile file){
        BaseResponse<BookDto> response = bookService.addBook(bookDto, file);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<BookDto>> update(@PathVariable Long id, @ModelAttribute BookDto bookDto,@RequestParam(value = "file", required = false) MultipartFile file){
        BaseResponse<BookDto> response = bookService.updateBook(bookDto, id, file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<BookDto>> delete(@PathVariable Long id){
        BaseResponse<BookDto> response = bookService.deleteBook(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<BookDto>> findById(@PathVariable Long id){
        BaseResponse<BookDto> response = bookService.getBookById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findByCondition")
    public ResponseEntity<ResponsePage<List<BookDto>>> findByCondition(@RequestParam Map<String,String> params, Pageable pageable) {
        ResponsePage<List<BookDto>> response = bookService.getBookByCondition(params,pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findByBookName")
    public ResponseEntity<BaseResponse<List<BookDto>>> findByBookName(@RequestParam(value = "name", required = false) String name) {
        BaseResponse<List<BookDto>> responsePage = bookService.getBookByName(name);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/best-seller")
    public ResponseEntity<BaseResponse<List<BookDto>>> bestSellerBook(){
        BaseResponse<List<BookDto>> response = bookService.bestSellerBook();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/new-arrived")
    public ResponseEntity<BaseResponse<List<BookDto>>> newArrivedBook(){
        BaseResponse<List<BookDto>> response = bookService.newArrivedBook();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/special-offer")
    public ResponseEntity<BaseResponse<List<BookDto>>> specialOffer(@RequestParam(value = "discount") Integer discount){
        BaseResponse<List<BookDto>> response = bookService.discountBook(discount);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findByPriceRange")
    public ResponseEntity<ResponsePage<List<BookDto>>> findByPriceRange(@RequestParam(value = "minPrice") Double minPrice, @RequestParam(value = "maxPrice")  Double maxPrice, Pageable pageable){
        ResponsePage<List<BookDto>> response = bookService.findByPriceRange(minPrice, maxPrice, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count-book")
    public ResponseEntity<BaseResponse<Long>> countBook(){
        BaseResponse<Long> response = bookService.getBookCount();
        return ResponseEntity.ok(response);
    }
}
