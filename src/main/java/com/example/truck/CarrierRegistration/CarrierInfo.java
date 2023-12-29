package com.example.truck.CarrierRegistration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class CarrierInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carMember;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 16)
    private String password;

    @Column(length = 10) // 희망지역 포함
    private String hopeArea;

    @Column(length = 20) //nullable 확인 필요할듯?
    private String driverLicense;

    @Column(nullable = false, length = 20)
    private String transportLicense;

    @Column(length = 20) //nullable 확인 필요할듯?
    private String carLicense;

    @Column(nullable = false, length = 20)
    private String account;

    @Column(nullable = false, unique = true, length = 20)
    private String email;
}
