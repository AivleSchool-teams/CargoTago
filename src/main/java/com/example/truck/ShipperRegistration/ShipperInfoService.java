package com.example.truck.ShipperRegistration;

import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipperInfoService {

    @Autowired
    private RegistInfoRepository registInfoRepository; // 예시 리포지토리

    // shipMemberId에 해당하는 RegistInfo 목록을 조회하는 메소드
    public List<RegistInfo> getRegistInfoByShipMemberId(Long shipMemberId) {
        // RegistInfoRepository에서 제공하는 쿼리 메소드를 사용하여 데이터 조회
        // 실제 구현에서는 리포지토리의 메소드 이름과 쿼리 로직이 다를 수 있습니다.
        return registInfoRepository.findByShipperInfo_ShipMember(shipMemberId);
    }
}
