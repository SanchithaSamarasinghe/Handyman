package com.backend.handyman.repository;

import com.backend.handyman.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    boolean existsByProfessionalEmailAndDate(String professionalEmail, String date);
}
