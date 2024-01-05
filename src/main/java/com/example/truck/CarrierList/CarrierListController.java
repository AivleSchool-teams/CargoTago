package com.example.truck.CarrierList;

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


    @GetMapping("/carrier/mylist")
    public ResponseEntity<?> getRegistInfo() {
        // 차주에게 제공할 화물 리스트 보여주기 (현재든 모든 화물 리스트를 제공)

        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<RegistInfo> registInfoList = carrierListService.getAllRegistInfo();

        return ResponseEntity.ok().body(registInfoList);
    }
}
