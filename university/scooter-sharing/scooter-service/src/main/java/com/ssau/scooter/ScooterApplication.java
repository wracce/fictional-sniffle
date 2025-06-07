package com.ssau.scooter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ScooterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScooterApplication.class, args);
	}

}
