package com.backend.handyman.service;
import com.backend.handyman.model.User;
import com.backend.handyman.repository.BookingRepo; // ✅ Add this import
import com.backend.handyman.model.Booking;                // ✅ Add this import
import java.util.List;

import com.backend.handyman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class UserService {
	 @Autowired
	    private UserRepository userRepository;
	 @Autowired
	    private BookingRepo bookingRepository; 
	 
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

	        return user.getRole();
	    }
	    public User getProfile(String email) {
	        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
	    }

	    public User updateProfile(String email, User updatedData) {
	        User user = getProfile(email);
	        user.setDescription(updatedData.getDescription());
	        user.setProfessions(updatedData.getProfessions());
	        user.setImageBase64(updatedData.getImageBase64());
	        return userRepository.save(user);
	    }
	    public List<User> getAvailableProfessionals(String profession, String date) {
	        List<User> professionals = userRepository.findProfessionalsByProfession(profession);

	        return professionals.stream()
	                .filter(pro -> !bookingRepository.existsByProfessionalEmailAndDate(pro.getEmail(), date))
	                .toList();
	    }

}