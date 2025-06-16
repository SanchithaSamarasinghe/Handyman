package com.backend.handyman.controller;

import com.backend.handyman.model.User;
import com.backend.handyman.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private UserService userService;

    // Fetch user profile by email
    @GetMapping("/{email}")
    public ResponseEntity<User> getProfile(@PathVariable String email) {
        User user = userService.getProfile(email);
        return ResponseEntity.ok(user);
    }

    // Update user profile
    @PutMapping("/{email}")
    public ResponseEntity<User> updateProfile(@PathVariable String email, @RequestBody User updatedUser) {
        User updated = userService.updateProfile(email, updatedUser);
        return ResponseEntity.ok(updated);
    }
}
