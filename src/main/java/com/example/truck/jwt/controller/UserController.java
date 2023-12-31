package com.example.truck.jwt.controller;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.CarrierRegistration.CarrierInfoRepository;
import com.example.truck.DTO.PageDTO;
import com.example.truck.ShipperRegistration.ShipperInfo;
import com.example.truck.ShipperRegistration.ShipperInfoRepository;
import com.example.truck.jwt.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.truck.jwt.service.CarrierService; // 이거 빼도 되는 코드 아닌가용? -> 작성자가 확인 후 삭제해 주세욥

import java.util.Optional;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private CarrierService carrierService; // 이거 빼도 되는 코드 아닌가용? -> 작성자가 확인 후 삭제해 주세욥

    @Autowired
    private ShipperInfoRepository shipperInfoRepository;

    @Autowired
    private CarrierInfoRepository carrierInfoRepository;

    @GetMapping("/mainpage")
    public PageDTO getUserDetails() {
        // SecurityContext에서 인증 정보를 가져옵니다.

        PageDTO pageDTO = null; // pageDTO를 블록 외부에서 선언

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Optional<CarrierInfo> originalUserOpt1 = carrierInfoRepository.findByEmail(authentication.getName());
        Optional<ShipperInfo> originalUserOpt2 = shipperInfoRepository.findByEmail(authentication.getName());

        if(originalUserOpt1.isPresent()) {
            CarrierInfo originalUser1 = originalUserOpt1.get();
            pageDTO = PageDTO.builder()
                    .id(originalUser1.getCarMember())
                    .name(originalUser1.getName())
                    .email(originalUser1.getEmail())
                    .phone(originalUser1.getPhone())
                    .typed("Carrier")
                    .build();

        } else if(originalUserOpt2.isPresent()) {
            ShipperInfo originalUser2 = originalUserOpt2.get();
            pageDTO = PageDTO.builder()
                    .id(originalUser2.getShipMember())
                    .name(originalUser2.getName())
                    .email(originalUser2.getEmail())
                    .phone(originalUser2.getPhone())
                    .typed("Shipper")
                    .build();
        }

        return pageDTO;
    }
}

