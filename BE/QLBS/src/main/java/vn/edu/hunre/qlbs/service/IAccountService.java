package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.model.dto.AccountDto;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.model.dto.OrderDto;
import vn.edu.hunre.qlbs.model.request.AccountRequest;
import vn.edu.hunre.qlbs.model.request.ChangePasswordRequest;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface IAccountService {
    ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable);
    BaseResponse<AccountDto> updateAccount(AccountRequest accountRequest, Long id, MultipartFile file);
    BaseResponse<AccountDto> deleteAccount(Long id);
    BaseResponse<AccountDto> getAccountById(Long id);
    BaseResponse<AccountDto> changePassword(Long id, ChangePasswordRequest changePasswordRequest);

    ResponsePage<List<BookDto>> getWishlistByEmail(Pageable pageable);
    BaseResponse<BookDto> addBook(Long bookId);
    BaseResponse<BookDto> deleteBook(Long bookId);
    BaseResponse<AccountDto> getAccount();
    ResponsePage<List<AccountDto>> findByCondition(String email, String phone, String roleName, Pageable pageable);
    BaseResponse<Boolean> checkLoyalCustomer();
    BaseResponse<Long> countAccount();
}
