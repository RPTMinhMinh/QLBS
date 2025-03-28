package vn.edu.hunre.qlbs.model.dto.auth;

public class VerifyUserDto {
    private String verificationCode;
    private RegisterUserDto registerUserDto;

    public RegisterUserDto getRegisterUserDto() {
        return registerUserDto;
    }

    public void setRegisterUserDto(RegisterUserDto registerUserDto) {
        this.registerUserDto = registerUserDto;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}
