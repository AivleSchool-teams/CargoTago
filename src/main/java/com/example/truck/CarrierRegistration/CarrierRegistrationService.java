package com.example.truck.CarrierRegistration;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarrierRegistrationService {

    private final CarrierInfoRepository carrierInfoRepository;
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
}

