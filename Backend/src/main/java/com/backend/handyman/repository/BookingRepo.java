package com.backend.handyman.repository;

import com.backend.handyman.model.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    boolean existsByProfessionalEmailAndDate(String professionalEmail, String date);
    List<Booking> findByCustomerEmail(String customerEmail);
    
    List<Booking> findByProfessionalEmailAndCompleted(String email, boolean completed);
    

}
