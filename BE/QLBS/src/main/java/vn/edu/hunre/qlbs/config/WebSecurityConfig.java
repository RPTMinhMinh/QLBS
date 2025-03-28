package vn.edu.hunre.qlbs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import vn.edu.hunre.qlbs.jwt.JwtAuthenticationEntryPoint;
import vn.edu.hunre.qlbs.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;


    public WebSecurityConfig(UserDetailsService userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter, JwtAuthenticationEntryPoint authenticationEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                                .requestMatchers("/auth/**").permitAll()
//                        .requestMatchers("/api/account/**").permitAll()
                                .requestMatchers("api/book/list", "api/book/findById/**", "api/book/findByCondition", "api/book/findByBookName", "api/book/best-seller", "api/book/new-arrived", "api/book/special-offer").permitAll()
                                .requestMatchers("api/book/create", "api/book/update/**", "api/book/delete/**", "api/book//count-book").hasAnyRole("ADMIN")
                                .requestMatchers("/api/category/list").permitAll()
                                .requestMatchers("api/account/addWishlist/**", "api/account/loyal-customer").hasAnyRole("CUSTOMER")
                                .requestMatchers("/api/account/deleteWishlist/**").hasAnyRole("CUSTOMER")
                                .requestMatchers("api/account/getBooksByEmail").hasAnyRole("CUSTOMER")
                                .requestMatchers("/api/cart/**").hasAnyRole("CUSTOMER")
//                        .requestMatchers("/api/image/**").permitAll()
//                        .requestMatchers("/api/publisher/**").permitAll()
                                .requestMatchers("/api/role/**").hasAnyRole("ADMIN")
//                        .requestMatchers("/api/account/getBooksByEmail").hasAnyRole("CUSTOMER")
//                                .requestMatchers("/api/order/**").permitAll()
                                .requestMatchers("/api/payment/**").hasAnyRole("CUSTOMER")
                                .requestMatchers("/api/review/create","/api/review/update/**","/api/review/checkReview/**","/api/review/getReviewByBook/**").hasAnyRole("CUSTOMER")
                                .requestMatchers("/api/review/list", "api/review/count-review").hasAnyRole("ADMIN")
                                .requestMatchers("/api/review/delete/**").hasAnyRole("ADMIN","CUSTOMER")
                                .requestMatchers("api/review/checkHasReview/**").hasAnyRole("CUSTOMER")
                                .requestMatchers("/api/account/getUser", "api/account/changePassword/**").hasAnyRole("ADMIN", "CUSTOMER")
                                .requestMatchers("/api/account/findByCondition", "api/account/count-account").hasAnyRole("ADMIN")
                                .requestMatchers("/api/order/create").hasAnyRole( "CUSTOMER")
                                .requestMatchers("/api/order-detail").hasAnyRole( "CUSTOMER")
                                .requestMatchers("api/order//count-order").hasAnyRole("ADMIN")
                                .requestMatchers("api/revenue/list").hasAnyRole("ADMIN")
                                .anyRequest().authenticated()
                );

        httpSecurity.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .permitAll()
                );

        return httpSecurity.build();
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder(14);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:3001");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("test"));
    }
}
