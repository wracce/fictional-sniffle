package com.ssau.scooter.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssau.scooter.entity.Scooter;
import java.util.Optional;


@Repository
public interface ScooterRepository extends JpaRepository<Scooter, Long> {
    Optional<Scooter> findOneByUserId(String userId);

}