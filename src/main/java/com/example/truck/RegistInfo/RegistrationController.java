package com.example.truck.RegistInfo;

import com.example.truck.CarrierRegistration.CarrierInfoDTO;
import com.example.truck.CarrierRegistration.CarrierRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;
    @PostMapping("/actual-endpoint")

    public Integer registerInfo(@RequestBody final RegistInfoDTO registInfoDTO) {

        return registrationService.findByUsernamecheck(registInfoDTO);

    }
}
