package com.ssau.scooter.service;

import com.ssau.scooter.entity.Scooter;
import com.ssau.scooter.repository.ScooterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ScooterService {

    @Autowired
    private ScooterRepository scooterRepository;

    public List<Scooter> getAllScooters() {
        return scooterRepository.findAll();
    }

    public Optional<Scooter> getScooterById(Long id) {
        return scooterRepository.findById(id);
    }

    public Scooter createScooter(Scooter scooter) {
        scooter.setUserId(null);
        scooter.setRented(false);
        return scooterRepository.save(scooter);
    }

    public Optional<Scooter> updateScooter(Long id, Scooter updatedScooter) {
        return scooterRepository.findById(id)
                .map(existingScooter -> {
                    existingScooter.setModel(updatedScooter.getModel());
                    existingScooter.setDailyRentalPrice(updatedScooter.getDailyRentalPrice());
                    existingScooter.setColor(updatedScooter.getColor());
                    existingScooter.setImageUrl(updatedScooter.getImageUrl());
                    return scooterRepository.save(existingScooter);
                });
    }

    public void deleteScooter(Long id) {
        scooterRepository.deleteById(id);
    }


    public boolean checkAvailable(Long id) {
        Optional<Scooter> scooterOptional = scooterRepository.findById(id);
        if (!scooterOptional.isPresent()) {
            throw new RuntimeException("Scooter not found");
        }

        Scooter scooter = scooterOptional.get();
        if (scooter.isRented()) {
            return false;
        }

        return true;
    }
    

    @Transactional
    public boolean rentScooter(Long scooterId, String userId) {
        Optional<Scooter> scooterOptional = scooterRepository.findById(scooterId);
        if (!scooterOptional.isPresent()) {
            throw new RuntimeException("Scooter not found");
        }

        Scooter scooter = scooterOptional.get();
        if (!checkAvailable(scooterId)) {
            throw new RuntimeException("Scooter is already rented");
        }

        if (getMyRent(userId) != null) {
            throw new RuntimeException("User has already rented");
        }

        scooter.setUserId(userId);
        scooter.setRented(true);
        scooterRepository.save(scooter);
        return true;
    }

    @Transactional
    public boolean cancelRent(String userId) {
        Scooter scooter = getMyRent(userId);
        
        if (scooter == null)
            return false;

        scooter.setUserId(null);
        scooter.setRented(false);
        scooterRepository.save(scooter);
        return true;
    }

    @Transactional
    public Scooter getMyRent( String userId) {
        Optional<Scooter> scooter = scooterRepository.findOneByUserId(userId);
        return scooter.orElse(null);
    }
}