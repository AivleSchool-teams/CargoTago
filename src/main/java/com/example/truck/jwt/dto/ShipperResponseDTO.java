package com.example.truck.jwt.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
public class ShipperResponseDTO {
    private String token;
    private String name;
    private String phone;
    private String email;
    private String pw;
    private String cname;
    private String account;
}
