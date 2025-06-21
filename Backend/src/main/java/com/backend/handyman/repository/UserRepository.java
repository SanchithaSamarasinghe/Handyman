package com.backend.handyman.repository;

import com.backend.handyman.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>  {

    Optional<User> findByEmail(String email);

    // 🔽 Add this method to find professionals by profession
    @Query("SELECT u FROM User u WHERE u.role = 'PROFESSIONAL' AND :profession IN elements(u.professions)")
    List<User> findProfessionalsByProfession(String profession);
}

