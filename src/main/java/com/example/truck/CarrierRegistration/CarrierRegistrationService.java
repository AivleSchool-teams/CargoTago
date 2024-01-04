package com.example.truck.CarrierRegistration;

import com.example.truck.CarrierCarInfo.CarrierCarInfo;
import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.CarrierCarInfo.CarrierCarInfoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarrierRegistrationService {

    private final CarrierInfoRepository carrierInfoRepository;
    private final CarrierCarInfoRepository carrierCarInfoRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Integer findByEmailCheck(final CarrierInfoDTO carrierInfoDTO) {
        Optional<CarrierInfo> vars1 = carrierInfoRepository.findByEmail(carrierInfoDTO.getEmail());
        if (vars1.isPresent()) {
            return 0;
        } else {
            CarrierInfo newCarrier = new CarrierInfo();
            newCarrier.setName(carrierInfoDTO.getName());
            newCarrier.setPhone(carrierInfoDTO.getPhone());
            newCarrier.setEmail(carrierInfoDTO.getEmail());
            newCarrier.setPassword(carrierInfoDTO.getPw());
            newCarrier.setTransportLicense(carrierInfoDTO.getTransportlicense());
            newCarrier.setAccount(carrierInfoDTO.getAccount());
            carrierInfoRepository.save(newCarrier);

            return 1;
        }


    }

    public List<CarrierCarInfo> getCarrierCarInfoByCarMemberId(Long carMemberId) {
        // RegistInfoRepository에서 제공하는 쿼리 메소드를 사용하여 데이터 조회
        // 실제 구현에서는 리포지토리의 메소드 이름과 쿼리 로직이 다를 수 있습니다.
        return carrierCarInfoRepository.findByCarrierInfo_CarMember(carMemberId);
    }
}

