package com.ssau.scooter.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String secretKey;

    @Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
            // System.out.println("key: "+secretKey);
    String authorizationHeader = request.getHeader("Authorization");

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
        String token = authorizationHeader.substring(7); // Извлекаем токен
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)); // Ключ для подписи

        try {
            // Парсим токен и извлекаем утверждения (claims)
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key) // Устанавливаем ключ для проверки подписи
                    .build()
                    .parseClaimsJws(token) // Парсим JWT
                    .getBody(); // Извлекаем тело токена

            // Извлекаем имя пользователя и другие данные
            String username = claims.getSubject();
            // System.out.println("Subject: " + username);
            // System.out.println("Email: " + claims.get("email"));
            // System.out.println("Issued at: " + claims.getIssuedAt());
            // System.out.println("Expiration: " + claims.getExpiration());

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Если аутентификация ещё не установлена в контексте
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Устанавливаем аутентификацию в контексте безопасности
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (Exception e) {
            // System.out.println("Invalid JWT: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Устанавливаем код ошибки 401
            response.getWriter().write("Invalid JWT Token"); // Отправляем сообщение об ошибке
            return; // Прерываем дальнейшую обработку запроса
        }
    }

    // Продолжаем выполнение фильтров
    filterChain.doFilter(request, response);
}
}
