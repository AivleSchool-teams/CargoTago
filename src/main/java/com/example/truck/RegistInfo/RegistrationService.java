package com.example.truck.RegistInfo;

import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoDTO;
import com.example.truck.RegistInfo.RegistInfoRepository;
import com.example.truck.ShipperRegistration.ShipperInfo;
import com.example.truck.ShipperRegistration.ShipperInfoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

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
            newRegist.setIsChecked3(registInfoDTO.getIsChecked3());
            newRegist.setText(registInfoDTO.getText());
            newRegist.setWeight(registInfoDTO.getWeight());
            newRegist.setSelectedSize(registInfoDTO.getSelectedSize());
            newRegist.setTextAreaValue(registInfoDTO.getTextAreaValue());
            newRegist.setSelectedValue(registInfoDTO.getSelectedValue());
            newRegist.setSelectedButton(registInfoDTO.getSelectedButton());
            newRegist.setShipperInfo(shipperInfo);

//            private boolean isChecked1; // 무진동 여부 T/F
//            private boolean isChecked2; // 냉동 여부 T/F
//            private boolean isChecked3;// 냉장 여부 T/F
            registInfoRepository.save(newRegist);
            return 1;
        }


    }
}

