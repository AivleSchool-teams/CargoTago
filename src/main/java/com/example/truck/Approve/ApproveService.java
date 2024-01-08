package com.example.truck.Approve;

import com.example.truck.Posts.PostsInfo;
import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ApproveService {

    private final RegistInfoRepository registInfoRepository;



    public RegistInfo one(Long id) {
        return registInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find post with id " + id));
    }


    public List<RegistInfo> getRegistInfoByCarMemberId(Long carMemberId) {
        // RegistInfoRepository에서 제공하는 쿼리 메소드를 사용하여 데이터 조회
        // 실제 구현에서는 리포지토리의 메소드 이름과 쿼리 로직이 다를 수 있습니다.
        return registInfoRepository.findByCarrierInfo_CarMember(carMemberId);
    }
}
