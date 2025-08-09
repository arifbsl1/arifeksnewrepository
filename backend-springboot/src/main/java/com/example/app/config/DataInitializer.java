package com.example.app.config;

import com.example.app.model.User;
import com.example.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if the admin user already exists
        if (userRepository.findByUsername("admin").isEmpty()) {
            // Create a new user if not found
            User adminUser = new User();
            
            // FIX: Set the username before saving
            adminUser.setUsername("admin");
            adminUser.setRole("ADMIN");
            adminUser.setPassword(passwordEncoder.encode("password"));

            userRepository.save(adminUser);
            System.out.println(">>> Created default admin user with username 'admin' and password 'password'");
        }
    }
}