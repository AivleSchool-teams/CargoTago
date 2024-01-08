package com.example.truck.CarrierList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CarrierListInfoDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String account;
}
