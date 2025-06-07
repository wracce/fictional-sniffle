package com.ssau.scooter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssau.scooter.auth.JwtUtils;
import com.ssau.scooter.entity.Scooter;
import com.ssau.scooter.dto.ScooterDto;
import com.ssau.scooter.mapper.ScooterMapper;
import com.ssau.scooter.service.ScooterService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/scooters")
public class ScooterController {

    @Autowired
    private ScooterService scooterService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public List<Scooter> getAllScooters() {
        return scooterService.getAllScooters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scooter> getScooterById(@PathVariable Long id) {
        Optional<Scooter> scooter = scooterService.getScooterById(id);
        return scooter.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Scooter createScooter(@RequestBody ScooterDto scooterDto) {
        Scooter scooter = ScooterMapper.toEntity(scooterDto);
        return scooterService.createScooter(scooter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Scooter> updateScooter(@PathVariable Long id, @RequestBody ScooterDto updatedScooterDto) {
        Scooter updatedScooter = ScooterMapper.toEntity(updatedScooterDto);
        Optional<Scooter> scooter = scooterService.updateScooter(id, updatedScooter);
        return scooter.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteScooter(@PathVariable Long id) {
        try {
            scooterService.deleteScooter(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/myrent")
    public ResponseEntity<ScooterDto> getMyRent(HttpServletRequest request) {
        try {
            String userId = jwtUtils.extractSubject(request);
            Scooter scooter = scooterService.getMyRent(userId);
            if (scooter == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(ScooterMapper.toDto(scooter));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/{scooterId}/available")
    public ResponseEntity<String> available(@PathVariable Long scooterId) {
        try {
            if(scooterService.checkAvailable(scooterId)==false){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Scooter is not available");
            };
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/{scooterId}/rent")
    public ResponseEntity<String> rentScooter(@PathVariable Long scooterId, HttpServletRequest request) {
        try {
            String userId = jwtUtils.extractSubject(request);
            scooterService.rentScooter(scooterId, userId);
            return ResponseEntity.status(HttpStatus.OK).body("Scooter rented successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<String> cancelRent(HttpServletRequest request) {
        try {
            String userId = jwtUtils.extractSubject(request);
            if(!scooterService.cancelRent(userId)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User has not rented");
            }
            return ResponseEntity.status(HttpStatus.OK).body("User rent cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}