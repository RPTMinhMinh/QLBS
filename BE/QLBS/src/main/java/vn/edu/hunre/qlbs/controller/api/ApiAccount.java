package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.model.dto.AccountDto;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.model.dto.OrderDto;
import vn.edu.hunre.qlbs.model.request.AccountRequest;
import vn.edu.hunre.qlbs.model.request.ChangePasswordRequest;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.IAccountService;

import java.util.List;

@RestController
@RequestMapping("/api/account")
public class ApiAccount {
    @Autowired
    private IAccountService accountService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<AccountDto>>> getAll(Pageable pageable){
        ResponsePage<List<AccountDto>> responsePage = accountService.getAllAccounts(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> update(@PathVariable Long id, @ModelAttribute AccountRequest accountRequest, @RequestParam(value = "file", required = false) MultipartFile file){
        BaseResponse<AccountDto> response = accountService.updateAccount(accountRequest,id,file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> delete(@PathVariable Long id){
        BaseResponse<AccountDto> response = accountService.deleteAccount(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> findById(@PathVariable Long id){
        BaseResponse<AccountDto> response = accountService.getAccountById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/changePassword/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> changePassword(@PathVariable Long id, @RequestBody ChangePasswordRequest changePasswordRequest){
        BaseResponse<AccountDto> response = accountService.changePassword(id, changePasswordRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getBooksByEmail")
    public ResponseEntity<ResponsePage<List<BookDto>>> getBooksByEmail(Pageable pageable){
        ResponsePage<List<BookDto>> responsePage = accountService.getWishlistByEmail(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/addWishlist/{id}")
    public ResponseEntity<BaseResponse<BookDto>> addWishlist(@PathVariable Long id){
        BaseResponse<BookDto> response = accountService.addBook(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteWishlist/{id}")
    public ResponseEntity<BaseResponse<BookDto>> deleteWishlist(@PathVariable Long id){
        BaseResponse<BookDto> response = accountService.deleteBook(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getUser")
    public ResponseEntity<BaseResponse<AccountDto>> getCurrentUser() {
        BaseResponse<AccountDto> response = accountService.getAccount();
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response);
        }
    }

    @GetMapping("/findByCondition")
    public ResponseEntity<ResponsePage<List<AccountDto>>> getAccountByCondition(@RequestParam(value = "email", required = false) String email,
                                                                            @RequestParam(value = "phone", required = false) String phone,
                                                                            @RequestParam(value = "roleName", required = false) String roleName,
                                                                            Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = accountService.findByCondition(email, phone, roleName, pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/loyal-customer")
    public ResponseEntity<BaseResponse<Boolean>> checkLoyalCustomer() {
        BaseResponse<Boolean> response = accountService.checkLoyalCustomer();
        return ResponseEntity.ok(response);
    }

    @GetMapping("count-account")
    public ResponseEntity<BaseResponse<Long>> countAccount(){
        BaseResponse<Long> response = accountService.countAccount();
        return ResponseEntity.ok(response);
    }
}
