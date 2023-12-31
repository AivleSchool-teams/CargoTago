package com.example.truck.CarrierRegistration;

import com.example.truck.CarrierCarInfo.CarrierCarInfo;
import com.example.truck.RegistInfo.RegistInfo;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @Column(nullable = false, length = 60)
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

    @Column(nullable = false, unique = true, length = 30)
    private String email;

    @OneToMany(mappedBy = "carrierInfo")
    @JsonBackReference
    private List<CarrierCarInfo> carrierCarInfo;

    @OneToMany(mappedBy = "carrierInfo")
    @JsonBackReference
    private List<RegistInfo> registInfo ;
}
