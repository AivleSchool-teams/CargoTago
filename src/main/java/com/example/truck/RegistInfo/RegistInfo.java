package com.example.truck.RegistInfo;

import com.example.truck.ShipperRegistration.ShipperInfo;
import com.example.truck.CarrierRegistration.CarrierInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class RegistInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //PK

    @Column(nullable = false, length = 40)
    private String username; //userid와 비교용?

//    @Column(nullable = false , length = 20)
//    private String selected; //독차 혼적

    @Column(nullable = false, length = 20)
    private String selected2;  //편도 왕복

    @Column(nullable = false, length = 20)
    private String arrivalDateTime; //도착날짜

    @Column(nullable = false, length = 20)
    private String departureDateTime; //출발날짜

    @Column(nullable = false, length = 16)
    private String tonnage;  //차량 톤수 1 1.4

    @Column(nullable = false, length = 20)
    private String selectedBox; // 카고 윙바디

    @Column(nullable = false, length = 20)
    private Boolean isChecked1; // 무진동 여부 T/F

    @Column(nullable = false, length = 20)
    private Boolean isChecked2; // 냉동 여부 T/F


    @Column(nullable = false, length = 100)
    private String text; // 요청사항 텍스트 에어리어


    @Column(nullable = false, length = 10)
    private String selectedSize; // 크기 소형 중형 대형

    @Column(nullable = false, length = 20)
    private String selectedBoxNew; // 파렛트 박스 기타

    @Column(nullable = false, length = 20)
    private Integer weight; // 총중량

    @Column(nullable = false, length = 100)
    private String textAreaValue; // 화물정보 세부내용 텍스트

    @Column(nullable = false, length = 100)
    private String selectedValue; // 수량? -> 일단 만들어두래서 만듬

    @Column(nullable = false, length = 20)
    private String selectedButton;

    @Column(nullable = false, length = 20)
    private String headquarters2; // 출발지 이름

    @Column(nullable = false, length = 20)
    private String headquarters3; //도착지 이름

    @Column(nullable = false, length = 20)
    private String arrival_Code; //도착지 우편번호

    @Column(nullable = false, length = 100)
    private String arrival_Address; //도착지 주소

    @Column(nullable = false, length = 50)
    private String arrival_detailAddress; //도착지 세부 주소

    @Column(nullable = false, length = 20)
    private String departure_code; //출발지 우편번호

    @Column(nullable = false, length = 100)
    private String departure_address; //출발지 주소

    @Column(nullable = false, length = 50)
    private String departure_detailAddress; //출발지 세부 주소

    @Column(nullable = false, length = 50)
    private String currentDateTime; //등록시간

    @Column(nullable = false,length = 50)
    private Float distance; // 총 거리

    @Column(nullable = false,length = 5)
    private Integer durationHour; // 소요 시간(H)

    @Column(nullable = false,length = 5)
    private Integer durationMin; // 소요 시간(M)

    @Column(nullable = false,length = 50)
    private Integer yourcost; // 실제 운임

    @Column(nullable = false,length = 5)
    private Integer status; // 배차 상태

    @Column(nullable = false,length = 20)
    private String sectors; // 업종 Ex)

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "shipMember")
    private ShipperInfo shipperInfo;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "carMember")
    private CarrierInfo carrierInfo; 

}
