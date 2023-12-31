package com.example.truck.jwt.service;

import com.example.truck.jwt.dto.UserResponseDTO;
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
public class UserService {


    private final CarrierInfoRepository carrierInfoRepository;
    private final PasswordEncoder passwordEncoder;

    public void findByEmailCheck(final UserResponseDTO userResponseDTO) {
        Optional<CarrierInfo> vars1 = carrierInfoRepository.findByEmail(userResponseDTO.getEmail());
        if (vars1.isPresent()) {
            log.warn("Email already exists {}", userResponseDTO.getEmail());
            throw new RuntimeException("Email already exists");
        } else {

            CarrierInfo newCarrier = new CarrierInfo();
            newCarrier.setName(userResponseDTO.getName());
            newCarrier.setPhone(userResponseDTO.getPhone());
            newCarrier.setEmail(userResponseDTO.getEmail());
            newCarrier.setPassword(passwordEncoder.encode(userResponseDTO.getPw()));
            newCarrier.setTransportLicense(userResponseDTO.getTransportlicense());
            newCarrier.setAccount(userResponseDTO.getAccount());
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
