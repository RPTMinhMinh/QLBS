package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.entity.*;
import vn.edu.hunre.qlbs.mapper.AccountMapper;
import vn.edu.hunre.qlbs.mapper.BookMapper;
import vn.edu.hunre.qlbs.model.dto.AccountDto;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.model.dto.ImageDto;
import vn.edu.hunre.qlbs.model.dto.OrderDto;
import vn.edu.hunre.qlbs.model.dto.auth.AuthDto;
import vn.edu.hunre.qlbs.model.request.AccountRequest;
import vn.edu.hunre.qlbs.model.request.ChangePasswordRequest;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.AccountRepository;
import vn.edu.hunre.qlbs.repository.BookRepository;
import vn.edu.hunre.qlbs.repository.ImageRepository;
import vn.edu.hunre.qlbs.repository.RoleRepository;
import vn.edu.hunre.qlbs.security.service.JwtService;
import vn.edu.hunre.qlbs.service.IAccountService;
import vn.edu.hunre.qlbs.service.IImageService;
import vn.edu.hunre.qlbs.utils.Constant;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class IAccountServiceImpl implements IAccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountMapper accountMapper;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private IImageService imageService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page =  accountRepository.getAll(pageable);
        List<AccountDto> accountDtos = page.getContent().stream().map(accountMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<AccountDto> updateAccount(AccountRequest accountRequest, Long id, MultipartFile file) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
        if (accountEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Account not found");
            return response;
        }
        AccountEntity account = accountEntity.get();
        account.setFullname(accountRequest.getFullname());
        account.setAddress(accountRequest.getAddress());
        account.setPhone(accountRequest.getPhone());
        Set<RoleEntity> roleEntities = new HashSet<>();
        for (Long roleId: accountRequest.getRoleId()){
            RoleEntity roleEntity = roleRepository.findById(roleId).orElse(null);
            roleEntities.add(roleEntity);
        }
        account.setRoles(roleEntities);
        accountRepository.save(account);
        ImageEntity imageEntity = imageRepository.findByAccountId(id);
        if (file != null) {
            if (imageEntity != null) {
                imageService.deleteImage(imageEntity.getPublicId());

            }else {
                imageEntity = new ImageEntity();
                imageEntity.setAccountEntity(account);
            }
            ImageDto imageDto = null;
            try {
                imageDto = imageService.uploadImage(file);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            imageEntity.setPublicId(imageDto.getPublicId());
            imageEntity.setType(file.getContentType());
            imageEntity.setUrl(imageDto.getUrl());
            imageRepository.save(imageEntity);
            accountRequest.setUrl(imageEntity.getUrl());
        } else if (imageEntity != null){
            accountRequest.setUrl(imageEntity.getUrl());
        }
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(accountMapper.toDto(account));
        return response;
    }

    @Override
    public BaseResponse<AccountDto> deleteAccount(Long id) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
        if (accountEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Account not found");
            return response;
        }
        AccountEntity account = accountEntity.get();
        account.setDeleted(true);
        accountRepository.save(account);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(accountMapper.toDto(account));
        return response;
    }

    @Override
    public BaseResponse<AccountDto> getAccountById(Long id) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
        if (accountEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Account not found");
            return response;
        }
        AccountEntity account = accountEntity.get();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(accountMapper.toDto(account));
        return response;
    }

    @Override
    public BaseResponse<AccountDto> changePassword(Long id, ChangePasswordRequest changePasswordRequest) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        Optional<AccountEntity> accountEntity = accountRepository.findById(id);
        if (accountEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Account not found");
            return response;
        }
        AccountEntity account = accountEntity.get();
        if (!passwordEncoder.matches(changePasswordRequest.getOldPassword(), account.getPassword())) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage("Mật khẩu cũ không đúng");
            return response;
        }
        String newPassword = changePasswordRequest.getNewPassword();
        String confirmPassword = changePasswordRequest.getConfirmPassword();
        if(newPassword.equals(changePasswordRequest.getOldPassword())){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage("Mật khẩu mới không được giống mật khẩu cũ");
            return response;
        }
        if(!newPassword.equals(confirmPassword)){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage("Xác nhận mật khẩu không trùng khớp");
            return response;
        }
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(accountMapper.toDto(account));
        return response;
    }

    @Override
    public ResponsePage<List<BookDto>> getWishlistByEmail(Pageable pageable) {
        ResponsePage<List<BookDto>> response = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Page<BookEntity> accountEntities = accountRepository.getWishListByEmail(pageable, email);
        List<BookDto> bookDtos = accountEntities.getContent().stream().map(bookMapper::toDto).toList();
        response.setPageNumber(pageable.getPageNumber());
        response.setPageSize(pageable.getPageSize());
        response.setTotalElements(accountEntities.getTotalElements());
        response.setTotalPages(accountEntities.getTotalPages());
        response.setContent(bookDtos);
        return response;
    }

    @Override
    public BaseResponse<BookDto> addBook(Long bookId) {
        BaseResponse<BookDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        AccountEntity accountEntity = accountRepository.findByEmail(email).orElse(null);
        if (accountEntity == null) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Account not found");
            return response;
        }
        BookEntity bookEntity = bookRepository.findById(bookId).orElse(null);
        if (bookEntity == null) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Book not found");
            return response;
        }
        if (!accountEntity.getBooks().contains(bookEntity)) {
            accountEntity.getBooks().add(bookEntity);
            accountRepository.save(accountEntity);
        }
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;

    }

    @Override
    public BaseResponse<BookDto> deleteBook(Long bookId) {
        BaseResponse<BookDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        AccountEntity accountEntity = accountRepository.findByEmail(email).orElse(null);
        if (accountEntity == null) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Account not found");
            return response;
        }
        BookEntity bookEntity = bookRepository.findById(bookId).orElse(null);
        if (bookEntity == null) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Book not found");
            return response;
        }
        if (accountEntity.getBooks().contains(bookEntity)) {
            accountEntity.getBooks().remove(bookEntity);
            accountRepository.save(accountEntity);

        }
        BookDto bookDto = bookMapper.toDto(bookEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(bookDto);
        return response;
    }

    @Override
    public BaseResponse<AccountDto> getAccount() {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        if (authDto == null) {
            response.setCode(HttpStatus.UNAUTHORIZED.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        String email = authDto.getEmail();
        AccountEntity account = accountRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Account not found"));
        AccountDto accountDto = accountMapper.toDto(account);
        response.setData(accountDto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);

        return response;
    }

    @Override
    public ResponsePage<List<AccountDto>> findByCondition(String email, String phone, String roleName, Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> accountEntities = accountRepository.findByCondition(email, phone, roleName, pageable);
        List<AccountDto> accountDtos = accountEntities.getContent().stream().map(accountMapper::toDto).toList();
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(accountEntities.getTotalElements());
        responsePage.setTotalPages(accountEntities.getTotalPages());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setContent(accountDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<Boolean> checkLoyalCustomer() {
        BaseResponse<Boolean> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Boolean checkAccount = accountRepository.checkOrderCount(email);
        if (checkAccount == null || !checkAccount) {
            response.setCode(HttpStatus.UNAUTHORIZED.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setData(false);
            return response;
        }
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(checkAccount);
        return response;
    }

    @Override
    public BaseResponse<Long> countAccount() {
        BaseResponse<Long> response = new BaseResponse<>();
        Long checkAccount = accountRepository.countAccount();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(checkAccount);
        return response;
    }


}
