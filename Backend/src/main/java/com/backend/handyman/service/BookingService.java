package com.backend.handyman.service;



import com.backend.handyman.model.Booking;
import com.backend.handyman.model.User;
import com.backend.handyman.repository.BookingRepo;
import com.backend.handyman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepository;

    @Autowired
    private UserRepository userRepository;

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

    public List<Map<String, Object>> getBookedProfessionals(String customerEmail) {
        List<Booking> bookings = bookingRepository.findByCustomerEmail(customerEmail);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Booking booking : bookings) {
            Optional<User> optionalPro = userRepository.findByEmail(booking.getProfessionalEmail());
            if (optionalPro.isPresent()) {
                User professional = optionalPro.get();
                Map<String, Object> map = new HashMap<>();
                map.put("id", professional.getId());
                map.put("name", professional.getName());
                map.put("profession", professional.getProfessions() != null && !professional.getProfessions().isEmpty()
                        ? professional.getProfessions().get(0)
                        : "Unknown");
                map.put("imageBase64", professional.getImageBase64());
                map.put("bookedDate", booking.getDate());
                result.add(map);
            }
        }

        return result;
    }
}
