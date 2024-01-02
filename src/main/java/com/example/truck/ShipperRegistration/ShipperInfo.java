package com.example.truck.ShipperRegistration;

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

public class ShipperInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carMember;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 60)
    private String password;

    @Column(nullable = false, length = 20)
    private String account;

    @Column(nullable = false, unique = true, length = 20)
    private String email;

    @Column(nullable = false, unique = true, length = 20)
    private String cname;
}

