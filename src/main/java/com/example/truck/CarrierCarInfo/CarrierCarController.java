package com.example.truck.CarrierCarInfo;

import com.example.truck.CarrierCarInfo.CarrierCarInfoDTO;
import com.example.truck.CarrierCarInfo.CarrierCarService;
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


}
