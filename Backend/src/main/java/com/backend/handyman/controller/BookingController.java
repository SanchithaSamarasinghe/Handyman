package com.backend.handyman.controller;

import com.backend.handyman.dto.BookingRequest;
import com.backend.handyman.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*") // ✅ allows requests from frontend
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<String> bookProfessional(@RequestBody BookingRequest request) {
        String result = bookingService.book(
                request.getProfessionalId(),
                request.getCustomerEmail(),
                request.getDate()
        );
        return ResponseEntity.ok(result);
    }
}
