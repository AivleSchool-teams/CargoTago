package com.example.truck.CarrierCarInfo;

import com.example.truck.CarrierCarInfo.CarrierCarInfoDTO;
import com.example.truck.CarrierCarInfo.CarrierCarService;
import com.example.truck.CarrierRegistration.CarrierInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class CarrierCarController {

    private final CarrierCarService carrierCarService;
    @PostMapping("/carrier/car")
    public Integer carriercarInfo(@RequestBody final CarrierCarInfoDTO carrierCarInfoDTO) {
        return carrierCarService.findByUsernamecheck(carrierCarInfoDTO);
    }

    @GetMapping("/carrierInfo/{userName}")
    public CarrierCarInfo getCarrierInfo(@PathVariable String userName) {
        return carrierCarService.getCarrierCarInfo(userName);
    }




}
