package vn.edu.hunre.qlbs.security;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.repository.AccountRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AccountEntity accountEntity = accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("UserEntity not found"));

        return new CustomUserDetails(accountEntity);
    }

}
