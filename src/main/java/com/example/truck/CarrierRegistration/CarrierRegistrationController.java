package com.example.truck.CarrierRegistration;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CarrierRegistrationController {

    private final CarrierRegistrationService carrierRegistrationService;

    @PostMapping("/register/carrier")

    public Integer registerUser(@RequestBody final CarrierInfoDTO carrierInfoDTO) {

        return carrierRegistrationService.findByEmailCheck(carrierInfoDTO);

    }
}
