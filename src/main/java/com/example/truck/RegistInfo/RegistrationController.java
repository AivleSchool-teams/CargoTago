package com.example.truck.RegistInfo;

import com.example.truck.CarrierRegistration.CarrierInfoDTO;
import com.example.truck.CarrierRegistration.CarrierRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;
    @PostMapping("/cargoregi/regi")
    public Integer registerInfo(@RequestBody final RegistInfoDTO registInfoDTO) {
        return registrationService.findByUsernamecheck(registInfoDTO);
    }


}
