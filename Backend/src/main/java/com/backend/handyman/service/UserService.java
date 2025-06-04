package com.backend.handyman.service;
import com.backend.handyman.model.User;

import com.backend.handyman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class UserService {
	 @Autowired
	    private UserRepository userRepository;

	    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	    public String registerUser(User user) {
	        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
	            return "Email already registered.";
	        }

	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        userRepository.save(user);

	        return "User registered successfully.";
}
	    public String loginUser(String email, String rawPassword) {
	        Optional<User> optionalUser = userRepository.findByEmail(email);

	        if (optionalUser.isEmpty()) {
	            return "Invalid email or password.";
	        }

	        User user = optionalUser.get();

	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
	            return "Invalid email or password.";
	        }

	        return "Login successful.";
	    }
}