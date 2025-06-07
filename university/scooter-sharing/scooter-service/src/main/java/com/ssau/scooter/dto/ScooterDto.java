package com.ssau.scooter.dto;

import lombok.Data;

@Data
public class ScooterDto {
    private Long id;
    private String userId;
    private String model;
    private double dailyRentalPrice;
    private String color;
    private String imageUrl;
    private boolean isRented;
}