package com.example.truck.jwt.security;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.ShipperRegistration.ShipperInfo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {
    private static final String SECRET_KEY = "CargoTagoTest123";

    public String create1(CarrierInfo carrierInfo) {
        // 기한은 지금부터 1일로 설정
        Date expiryDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS));

        // JWT Token 생성
        return Jwts.builder()
                // header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                // payload에 들어갈 내용
                .setSubject(carrierInfo.getEmail()) // sub
                .setIssuer("cargo tago") 			// iss
                .setIssuedAt(new Date())		// iat
                .setExpiration(expiryDate)		// exp
                .compact();
    }

    public String create2(ShipperInfo shipperInfo) {
        // 기한은 지금부터 1일로 설정
        Date expiryDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS));

        // JWT Token 생성
        return Jwts.builder()
                // header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                // payload에 들어갈 내용
                .setSubject(shipperInfo.getEmail()) // sub
                .setIssuer("cargo tago") 			// iss
                .setIssuedAt(new Date())		// iat
                .setExpiration(expiryDate)		// exp
                .compact();
    }

    public String validateAndGetUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject(); // subject 즉 사용자 이메일의 string을 리턴
    }
}
