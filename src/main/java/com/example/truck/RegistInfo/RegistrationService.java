package com.example.truck.RegistInfo;

import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoDTO;
import com.example.truck.RegistInfo.RegistInfoRepository;
import com.example.truck.ShipperRegistration.ShipperInfo;
import com.example.truck.ShipperRegistration.ShipperInfoRepository;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistInfoRepository registInfoRepository;
    private final PasswordEncoder passwordEncoder;

    private final ShipperInfoRepository shipperInfoRepository; // ShipperInfoRepository 의존성 추가

    @Transactional
    public Integer findByUsernamecheck(final RegistInfoDTO registInfoDTO) {
        Optional<RegistInfo> vars1 = registInfoRepository.findByUsername(registInfoDTO.getText());
        if (vars1.isPresent()) {
            return 0;
        } else {
            ShipperInfo shipperInfo = shipperInfoRepository.findByShipMember(registInfoDTO.getShipmember())
                    .orElseThrow(() -> new RuntimeException("ShipperInfo not found"));

            RegistInfo newRegist = new RegistInfo();
            newRegist.setId(registInfoDTO.getId());
            newRegist.setUsername(registInfoDTO.getUsername());
//            newRegist.setSelected(registInfoDTO.getSelected());
            newRegist.setSelected2(registInfoDTO.getSelected2());
            newRegist.setArrivalDateTime(registInfoDTO.getArrivalDateTime());
            newRegist.setDepartureDateTime(registInfoDTO.getDepartureDateTime());
            newRegist.setTonnage(registInfoDTO.getTonnage());
            newRegist.setSelectedBox(registInfoDTO.getSelectedBox());
            newRegist.setSelectedBoxNew(registInfoDTO.getSelectedBoxNew());
            newRegist.setIsChecked1(registInfoDTO.getIsChecked1());
            newRegist.setIsChecked2(registInfoDTO.getIsChecked2());
            newRegist.setText(registInfoDTO.getText());
            newRegist.setWeight(registInfoDTO.getWeight());
            newRegist.setSelectedSize(registInfoDTO.getSelectedSize());
            newRegist.setTextAreaValue(registInfoDTO.getTextAreaValue());
            newRegist.setSelectedValue(registInfoDTO.getSelectedValue());
            newRegist.setSelectedButton(registInfoDTO.getSelectedButton());

            newRegist.setHeadquarters2(registInfoDTO.getHeadquarters2());
            newRegist.setHeadquarters3(registInfoDTO.getHeadquarters3());


            newRegist.setArrival_Code(registInfoDTO.getArrival_Code());
            newRegist.setArrival_Address(registInfoDTO.getArrival_Address());
            newRegist.setArrival_detailAddress(registInfoDTO.getArrival_detailAddress());

            newRegist.setDeparture_code(registInfoDTO.getDeparture_code());
            newRegist.setDeparture_address(registInfoDTO.getDeparture_address());
            newRegist.setDeparture_detailAddress(registInfoDTO.getDeparture_detailAddress());
            newRegist.setCurrentDateTime(registInfoDTO.getCurrentDateTime());

            newRegist.setDistance(registInfoDTO.getDistance());
            newRegist.setDurationHour(registInfoDTO.getDurationHour());
            newRegist.setDurationMin(registInfoDTO.getDurationMin());
            newRegist.setYourcost(registInfoDTO.getYourcost());

            newRegist.setStatus(registInfoDTO.getStatus());

            newRegist.setShipperInfo(shipperInfo);



//            private boolean isChecked1; // 무진동 여부 T/F
//            private boolean isChecked2; // 냉동 여부 T/F
//            private boolean isChecked3;// 냉장 여부 T/F
            registInfoRepository.save(newRegist);
            return 1;
        }


    }
}
