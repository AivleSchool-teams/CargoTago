package com.example.truck.ShipperRegistration;

import com.example.truck.RegistInfo.RegistInfo;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity

public class ShipperInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shipMember;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 60)
    private String password;

    @Column(nullable = false, length = 20)
    private String account;

    @Column(nullable = false, unique = true, length = 30)
    private String email;

    @Column(nullable = false, unique = true, length = 20)
    private String cname;

    @OneToMany(mappedBy = "shipperInfo")
    @JsonBackReference
    private List<RegistInfo> registInfo ;




}

