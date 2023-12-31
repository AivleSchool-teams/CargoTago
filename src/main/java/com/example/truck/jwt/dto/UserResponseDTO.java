package com.example.truck.jwt.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
public class UserResponseDTO {
    private String token;
    private String name;
    private String phone;
    private String email;
    private String pw;
    private String transportlicense;
    private String account;
}
