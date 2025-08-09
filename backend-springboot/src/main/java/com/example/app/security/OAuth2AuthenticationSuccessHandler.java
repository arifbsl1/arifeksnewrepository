package com.example.app.security;

import com.example.app.model.User;
import com.example.app.repository.UserRepository;
import com.example.app.service.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.UUID;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        // FIX: Make user identification more robust
        String username = oAuth2User.getAttribute("email"); // Try for email (Google, etc.)
        if (username == null) {
            username = oAuth2User.getAttribute("login"); // Fallback for login (GitHub, etc.)
        }

        // If we still don't have a username, we cannot proceed.
        if (username == null) {
            logger.error("Could not determine username from OAuth2 provider. Attributes: " + oAuth2User.getAttributes());
            // Redirect to a login failure page with an error message
            getRedirectStrategy().sendRedirect(request, response, "/login?error=Cannot_retrieve_user_details");
            return;
        }

        final String finalUsername = username;
        userRepository.findByUsername(finalUsername).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(finalUsername);
            newUser.setRole("USER");
            newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString())); 
            logger.info("Creating new user from OAuth2 login: " + finalUsername);
            return userRepository.save(newUser);
        });

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(finalUsername);
        
        Authentication newAuthentication = new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities()
        );

        String token = tokenProvider.createToken(newAuthentication);

        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:4200/login-success")
                .queryParam("token", token)
                .build().toUriString();

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}