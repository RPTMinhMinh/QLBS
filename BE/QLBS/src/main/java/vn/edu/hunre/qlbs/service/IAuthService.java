package vn.edu.hunre.qlbs.service;


import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.model.dto.auth.LoginUserDto;
import vn.edu.hunre.qlbs.model.dto.auth.RegisterUserDto;
import vn.edu.hunre.qlbs.model.dto.auth.VerifyUserDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;

public interface IAuthService {
    BaseResponse<RegisterUserDto> signup(RegisterUserDto input);
    AccountEntity authenticate(LoginUserDto input);
    void verifyUser(VerifyUserDto input);
    void resendVerificationCode(String email);
    void sendVerificationEmail(String email, String verificationCode);
}
