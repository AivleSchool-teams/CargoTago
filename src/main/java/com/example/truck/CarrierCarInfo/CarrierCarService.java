package com.example.truck.CarrierCarInfo;

import com.example.truck.CarrierCarInfo.CarrierCarInfo;
import com.example.truck.CarrierCarInfo.CarrierCarInfoDTO;
import com.example.truck.CarrierCarInfo.CarrierCarInfoRepository;
import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.CarrierRegistration.CarrierInfoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarrierCarService {

    private final CarrierCarInfoRepository carrierCarInfoRepository;
    private final CarrierInfoRepository carrierInfoRepository;

    @Transactional
    public Integer findByUsernamecheck(final CarrierCarInfoDTO carrierCarInfoDTO) {
        Optional<CarrierCarInfo> vars1 = carrierCarInfoRepository.findByUsername(carrierCarInfoDTO.getUsername());
        if (vars1.isPresent()) {
            return 0;
        } else {
            CarrierInfo carrierInfo = carrierInfoRepository.findByCarMember(carrierCarInfoDTO.getCarmember())
                    .orElseThrow(() -> new RuntimeException("CarrierInfo not found"));

            CarrierCarInfo newCar = new CarrierCarInfo();
            newCar.setId(carrierCarInfoDTO.getId());
            newCar.setUsername(carrierCarInfoDTO.getUsername());

            newCar.setTonnage(carrierCarInfoDTO.getTonnage());
            newCar.setSelectedBox(carrierCarInfoDTO.getSelectedBox());

            newCar.setIsChecked1(carrierCarInfoDTO.getIsChecked1());
            newCar.setIsChecked2(carrierCarInfoDTO.getIsChecked2());

            newCar.setArea1(carrierCarInfoDTO.getArea1());
            newCar.setArea2(carrierCarInfoDTO.getArea2());
            newCar.setDistance(carrierCarInfoDTO.getDistance());
            newCar.setSectors(carrierCarInfoDTO.getSectors());

            newCar.setCarrierInfo(carrierInfo);

            carrierCarInfoRepository.save(newCar);
            return 1;
        }
    }
}
