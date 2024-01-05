package com.example.truck.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PageDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String typed;
}
