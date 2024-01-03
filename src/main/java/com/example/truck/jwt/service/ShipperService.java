package com.example.truck.jwt.service;

import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.jwt.dto.ShipperResponseDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.truck.ShipperRegistration.ShipperInfo;
import com.example.truck.ShipperRegistration.ShipperInfoRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;
@Slf4j
@Service
@RequiredArgsConstructor
public class ShipperService {


    private final ShipperInfoRepository shipperInfoRepository;
    private final PasswordEncoder passwordEncoder;

    public void findByEmailCheck(final ShipperResponseDTO shipperResponseDTO) {
        Optional<ShipperInfo> vars1 = shipperInfoRepository.findByEmail(shipperResponseDTO.getEmail());
        if (vars1.isPresent()) {
            log.warn("Email already exists {}", shipperResponseDTO.getEmail());
            throw new RuntimeException("Email already exists");
        } else {

            ShipperInfo newShipper = new ShipperInfo();
            newShipper.setName(shipperResponseDTO.getName());
            newShipper.setPhone(shipperResponseDTO.getPhone());
            newShipper.setEmail(shipperResponseDTO.getEmail());
            newShipper.setPassword(passwordEncoder.encode(shipperResponseDTO.getPw()));
            newShipper.setCname(shipperResponseDTO.getCname());
            newShipper.setAccount(shipperResponseDTO.getAccount());
            shipperInfoRepository.save(newShipper);
        }
    }

    public ShipperInfo getByCredentials(final String email, final String password, final PasswordEncoder encoder) {
        Optional<ShipperInfo> originalUserOpt = shipperInfoRepository.findByEmail(email);
        if (originalUserOpt.isPresent()) {
            ShipperInfo originalUser = originalUserOpt.get();

            if(encoder.matches(password, originalUser.getPassword())) {
                return originalUser;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }



    public List<RegistInfo> getRegistInfoByShipMemberId(Long shipMemberId) {
        // shipMemberId로 ShipperInfo 엔티티 조회
        ShipperInfo shipperInfo = shipperInfoRepository.findByShipMember(shipMemberId)
                .orElseThrow(() -> new RuntimeException("ShipperInfo not found with id: " + shipMemberId));

        // 해당 ShipperInfo와 연관된 RegistInfo 리스트 반환
        return shipperInfo.getRegistInfo();
    }


}
