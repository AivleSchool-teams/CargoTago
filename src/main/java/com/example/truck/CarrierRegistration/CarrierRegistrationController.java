package com.example.truck.CarrierRegistration;

import com.example.truck.DTO.PageDTO;
import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoRepository;
import com.example.truck.CarrierCarInfo.CarrierCarInfo;
import com.example.truck.CarrierCarInfo.CarrierCarInfoRepository;
import com.example.truck.CarrierRegistration.CarrierInfoRepository;
import com.example.truck.CarrierRegistration.CarrierRegistrationService;
import com.example.truck.ShipperRegistration.ShipperInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class CarrierRegistrationController {

    @Autowired
    private CarrierInfoRepository carrierInfoRepository;

    @Autowired
    private CarrierRegistrationService carrierRegistrationService;

    @Autowired
    private CarrierCarInfoRepository carrierCarInfoRepository;

    @GetMapping("/{carMember}")
    public CarrierInfo getCarrierInfo(@PathVariable Long carMember) {
        return carrierRegistrationService.getCarrierInfo(carMember);
    }

    @GetMapping("/carrier/car")
    public ResponseEntity<?> getRegistInfo() {
        PageDTO pageDTO = null; // pageDTO를 블록 외부에서 선언

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<CarrierInfo> originalUserOpt2 = carrierInfoRepository.findByEmail(authentication.getName());

        if(originalUserOpt2.isEmpty()) {
            return ResponseEntity.ofNullable(null);
        }
        CarrierInfo originalUser2 = originalUserOpt2.get();
        pageDTO = PageDTO.builder()
                .id(originalUser2.getCarMember())
                .name(originalUser2.getName())
                .email(originalUser2.getEmail())
                .typed("Carrier")
                .build();

        List<CarrierCarInfo> registInfoList = carrierRegistrationService.getCarrierCarInfoByCarMemberId(pageDTO.getId());
        return ResponseEntity.ok().body(registInfoList);
    }
}
