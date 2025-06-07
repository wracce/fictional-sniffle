package com.ssau.scooter.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtils {
    
    @Value("${jwt.secret}")
    private String secretKey;

    public String extractSubject(HttpServletRequest request) {
        // System.out.println("key2: " + secretKey);
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); 
            SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key) 
                        .build()
                        .parseClaimsJws(token) 
                        .getBody(); 

                return claims.getSubject();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
        return null;
    }
}