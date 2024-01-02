package com.example.truck.RegistInfo;

import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class RegistInfoDTO {

    private Long id; //PK
    private String username; //userid와 비교용?
//    private String selected; //독차 혼적
    private String selected2;  //편도 왕복
    private String arrivalDateTime; //도착날짜
    private String departureDateTime;  //출발날짜
    private String tonnage;  //차량 톤수 1 1.4
    private String selectedBox; // 카고 윙바디
    private Boolean isChecked1; // 무진동 여부 T/F
    private Boolean isChecked2; // 냉동 여부 T/F
    private Boolean isChecked3;// 냉장 여부 T/F
    private String text; // 요청사항 텍스트 에어리어
    private String selectedSize; // 크기 소형 중형 대형
    private String selectedBoxNew; // 파렛트 박스 기타
    private Integer weight; // 총중량
    private String textAreaValue; // 화물정보 세부내용 텍스트
    private String selectedValue; // 수량? -> 일단 만들어두래서 만듬
    private String selectedButton;
}
