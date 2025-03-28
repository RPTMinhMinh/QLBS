package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.mapper.AccountMapper;
import vn.edu.hunre.qlbs.model.dto.AccountDto;
import vn.edu.hunre.qlbs.model.dto.auth.AuthDto;
import vn.edu.hunre.qlbs.model.dto.auth.LoginUserDto;
import vn.edu.hunre.qlbs.model.dto.auth.RegisterUserDto;
import vn.edu.hunre.qlbs.model.dto.auth.VerifyUserDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.LoginResponse;
import vn.edu.hunre.qlbs.security.service.JwtService;
import vn.edu.hunre.qlbs.service.IAuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiAuth {
    @Autowired
    private IAuthService iAuthService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountMapper accountMapper;


    @PostMapping("/signup")
    public ResponseEntity<BaseResponse<RegisterUserDto>> signup(@RequestBody RegisterUserDto input) {
        BaseResponse<RegisterUserDto> userDTO = iAuthService.signup(input);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {

        AccountEntity authenticatedUser = iAuthService.authenticate(loginUserDto);
        AccountDto accountDto = accountMapper.toDto(authenticatedUser);
        String jwtToken = jwtService.generateToken(accountDto);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            iAuthService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/decode-token")
    public ResponseEntity<AuthDto> decodeToken() {
        AuthDto decodedClaims = jwtService.decodeToken();
        return ResponseEntity.ok(decodedClaims);
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            iAuthService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

