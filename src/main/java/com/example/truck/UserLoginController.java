package com.example.truck;


import com.example.truck.CarrierRegistration.CarrierInfoDTO;
import com.example.truck.CarrierRegistration.CarrierRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserLoginController {

    private final UserSecurityService userSecurityService;

    @PostMapping("/user/login")

    public UserDetails Login(@RequestBody final UserLoginDTO userLoginDTO) {

        return userSecurityService.loadUserByUsername(userLoginDTO.getEmail());
        //이렇게 해도 괜찮은듯?..

    }
}
