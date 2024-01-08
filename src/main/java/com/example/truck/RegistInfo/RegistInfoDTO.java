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
    private String text; // 요청사항 텍스트 에어리어
    private String selectedSize; // 크기 소형 중형 대형
    private String selectedBoxNew; // 파렛트 박스 기타
    private Integer weight; // 총중량
    private String textAreaValue; // 화물정보 세부내용 텍스트
    private String selectedValue; // 수량? -> 일단 만들어두래서 만듬
    private String selectedButton;

    private String headquarters2; // 출발지 이름
    private String headquarters3; // 도착지 이름
    private String arrival_Code; //도착지 우편번호
    private String arrival_Address; //도착지 주소
    private String arrival_detailAddress; //도착지 세부 주소
    private String departure_code; //출발지 우편번호
    private String departure_address; //출발지 주소
    private String departure_detailAddress; //출발지 세부 주소
    private String currentDateTime; //등록 시간

    private Float distance; // 총 거리
    private Integer durationHour; // 소요 시간(h)
    private Integer durationMin; // 소요 시간(m)
    private Integer yourcost; // 실제 운임

    private Integer status;

    private String newoption; // 배차 상태

    private Long shipmember;
}
