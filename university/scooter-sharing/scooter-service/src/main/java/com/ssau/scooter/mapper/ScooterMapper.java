package com.ssau.scooter.mapper;

import com.ssau.scooter.entity.Scooter;
import com.ssau.scooter.dto.ScooterDto;

public class ScooterMapper {

    public static ScooterDto toDto(Scooter scooter) {
        if (scooter == null) {
            return null;
        }
        ScooterDto dto = new ScooterDto();
        dto.setId(scooter.getId());
        dto.setUserId(scooter.getUserId());
        dto.setModel(scooter.getModel());
        dto.setDailyRentalPrice(scooter.getDailyRentalPrice());
        dto.setColor(scooter.getColor());
        dto.setImageUrl(scooter.getImageUrl());
        dto.setRented(scooter.isRented());
        return dto;
    }

    public static Scooter toEntity(ScooterDto dto) {
        if (dto == null) {
            return null;
        }
        Scooter scooter = new Scooter();
        scooter.setModel(dto.getModel());
        scooter.setDailyRentalPrice(dto.getDailyRentalPrice());
        scooter.setColor(dto.getColor());
        scooter.setImageUrl(dto.getImageUrl());
        return scooter;
    }
}