package vn.edu.hunre.qlbs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class JpaAuditingConfig {

    @Bean
    public AuditorAware<String> auditorAware() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null ||
                    !authentication.isAuthenticated() ||
                    "anonymousUser".equals(authentication.getPrincipal())) {
                return Optional.of("anonymousUser");
            }
            Object principal = authentication.getPrincipal();
            if (principal instanceof String) {
                return Optional.of((String) principal); // Trường hợp principal là email dạng String
            } else if (principal instanceof UserDetails) {
                return Optional.of(((UserDetails) principal).getUsername()); // Trường hợp UserDetails
            }
            return Optional.of("unknownUser");
        };
    }
}
