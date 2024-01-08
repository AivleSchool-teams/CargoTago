package com.example.truck.CarrierList;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.CarrierRegistration.CarrierInfoRepository;
import com.example.truck.DTO.PageDTO;
import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoRepository;
import com.example.truck.ShipperRegistration.ShipperInfo;
import com.example.truck.ShipperRegistration.ShipperInfoRepository;
import com.example.truck.ShipperRegistration.ShipperInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/user")
public class CarrierListController {
    @Autowired
    private ShipperInfoRepository shipperInfoRepository;

    @Autowired
    private ShipperInfoService shipperInfoService;

    @Autowired
    private RegistInfoRepository registInfoRepository;

    @Autowired
    private CarrierListService carrierListService;

    @Autowired
    private CarrierInfoRepository carrierInfoRepository;


    @GetMapping("/carrier/alllist")
    public ResponseEntity<?> getRegistInfoall() {
        // 차주에게 제공할 화물 리스트 보여주기 (현재는 모든 화물 리스트를 제공)
        List<RegistInfo> registInfoList = carrierListService.getAllRegistInfo();

        return ResponseEntity.ok().body(registInfoList);
    }

    @GetMapping("/carrier/mylist")
    public ResponseEntity<?> getRegistInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<CarrierInfo> originalUserOpt1 = carrierInfoRepository.findByEmail(authentication.getName());

        if(originalUserOpt1.isPresent()) {
            CarrierInfo originalUser1 = originalUserOpt1.get();
            List<RegistInfo> registInfoList = registInfoRepository.findByCarrierInfo_CarMember(originalUser1.getCarMember());

            return ResponseEntity.ok().body(registInfoList);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + authentication.getName());
        }
    }

    @GetMapping("/carrier/mypage")
    public CarrierListInfoDTO getCarrierInfo() {
        CarrierListInfoDTO pageDTO = null; // pageDTO를 블록 외부에서 선언

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<CarrierInfo> originalUserOpt1 = carrierInfoRepository.findByEmail(authentication.getName());

        if (originalUserOpt1.isPresent()) {
            CarrierInfo originalUser1 = originalUserOpt1.get();
            pageDTO = CarrierListInfoDTO.builder()
                    .id(originalUser1.getCarMember())
                    .name(originalUser1.getName())
                    .email(originalUser1.getEmail())
                    .phone(originalUser1.getPhone())
                    .account(originalUser1.getAccount())
                    .build();
        }

        return pageDTO;
    }

}
