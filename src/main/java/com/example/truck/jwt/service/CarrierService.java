package com.example.truck.jwt.service;

import com.example.truck.jwt.dto.CarrierResponseDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.CarrierRegistration.CarrierInfoRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;
@Slf4j
@Service
@RequiredArgsConstructor
public class CarrierService {


    private final CarrierInfoRepository carrierInfoRepository;
    private final PasswordEncoder passwordEncoder;

    public void findByEmailCheck(final CarrierResponseDTO carrierResponseDTO) {
        Optional<CarrierInfo> vars1 = carrierInfoRepository.findByEmail(carrierResponseDTO.getEmail());
        if (vars1.isPresent()) {
            log.warn("Email already exists {}", carrierResponseDTO.getEmail());
            throw new RuntimeException("Email already exists");
        } else {

            CarrierInfo newCarrier = new CarrierInfo();
            newCarrier.setName(carrierResponseDTO.getName());
            newCarrier.setPhone(carrierResponseDTO.getPhone());
            newCarrier.setEmail(carrierResponseDTO.getEmail());
            newCarrier.setPassword(passwordEncoder.encode(carrierResponseDTO.getPw()));
            newCarrier.setTransportLicense(carrierResponseDTO.getTransportlicense());
            newCarrier.setAccount(carrierResponseDTO.getAccount());
            carrierInfoRepository.save(newCarrier);
        }
    }

    public CarrierInfo getByCredentials(final String email, final String password, final PasswordEncoder encoder) {
        Optional<CarrierInfo> originalUserOpt = carrierInfoRepository.findByEmail(email);
        if (originalUserOpt.isPresent()) {
            CarrierInfo originalUser = originalUserOpt.get();

            if(encoder.matches(password, originalUser.getPassword())) {
                return originalUser;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }


}
