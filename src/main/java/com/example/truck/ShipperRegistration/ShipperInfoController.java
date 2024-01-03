package com.example.truck.ShipperRegistration;

import com.example.truck.DTO.PageDTO;
import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoRepository;
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

public class ShipperInfoController {

    @Autowired
    private ShipperInfoRepository shipperInfoRepository;

    @Autowired
    private ShipperInfoService shipperInfoService;

    @Autowired
    private RegistInfoRepository registInfoRepository;


    @GetMapping("/shipper/mylist")
    public ResponseEntity<?> getRegistInfo() {
        PageDTO pageDTO = null; // pageDTO를 블록 외부에서 선언

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<ShipperInfo> originalUserOpt2 = shipperInfoRepository.findByEmail(authentication.getName());

        if(originalUserOpt2.isEmpty()) {
            return ResponseEntity.ofNullable(null);
        }
        ShipperInfo originalUser2 = originalUserOpt2.get();
        pageDTO = PageDTO.builder()
                .id(originalUser2.getShipMember())
                .name(originalUser2.getName())
                .email(originalUser2.getEmail())
                .typed("Shipper")
                .build();

        List<RegistInfo> registInfoList = shipperInfoService.getRegistInfoByShipMemberId(pageDTO.getId());
        return ResponseEntity.ok().body(registInfoList);
    }
}
