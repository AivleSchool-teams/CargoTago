package com.example.truck.CarrierCarInfo;

import lombok.Getter;

@Getter
public class CarrierCarInfoDTO {

    private Long id; //PK
    private String username; //userid와 비교용?
    private String tonnage;  //차량 톤수 1 1.4
    private String selectedBox; // 카고 윙바디
    private Boolean isChecked1; // 무진동 여부 T/F
    private Boolean isChecked2; // 냉동냉장 여부 T/F
    private String area1;  // 선호 지역 1
    private String area2; // 선호 지역 2
    private String distance; // 선호 이동 거리
    private String sectors; // 선호 업종
    private String carnumber; //차량 번호


    private Long carmember;

}
