package com.backend.handyman.service;

import com.backend.handyman.model.Booking;
import com.backend.handyman.repository.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepository;

    public String book(String professionalEmail, String customerEmail, String date) {
        if (bookingRepository.existsByProfessionalEmailAndDate(professionalEmail, date)) {
            throw new IllegalStateException("Professional already booked for this date.");
        }

        Booking booking = new Booking();
        booking.setProfessionalEmail(professionalEmail);
        booking.setCustomerEmail(customerEmail);
        booking.setDate(date);
        bookingRepository.save(booking);

        return "Booking successful!";
    }
}
