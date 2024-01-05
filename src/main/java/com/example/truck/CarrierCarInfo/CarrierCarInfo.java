package com.example.truck.CarrierCarInfo;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class CarrierCarInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //PK

    @Column(nullable = false, length = 40)
    private String username; //userid와 비교용?

    @Column(nullable = false, length = 16)
    private String tonnage;  //차량 톤수

    @Column(nullable = false, length = 20)
    private String selectedBox; // 카고 윙바디

    @Column(nullable = false, length = 20)
    private Boolean isChecked1; // 무진동 여부 T/F

    @Column(nullable = false, length = 20)
    private Boolean isChecked2; // 냉장 / 냉동 여부 T/F

    @Column(nullable = false, length = 20)
    private String area1; // 선호 지역 1

    @Column(nullable = false, length = 20)
    private String area2; // 선호 지역 2

    @Column(nullable = false, length = 20)
    private String distance; // 선호 이동 거리

    @Column(nullable = false, length = 20)
    private String sectors; // 선호 업종

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "carMember")
    private CarrierInfo carrierInfo;
}
