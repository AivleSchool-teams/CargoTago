package com.example.truck.jwt.controller;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.ShipperRegistration.ShipperInfo;
import com.example.truck.jwt.dto.CarrierResponseDTO;
import com.example.truck.jwt.dto.ResponseDTO;
import com.example.truck.jwt.dto.ShipperResponseDTO;
import com.example.truck.jwt.service.CarrierService;
import com.example.truck.jwt.service.ShipperService;
import com.example.truck.jwt.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.truck.jwt.security.TokenProvider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private CarrierService carrierService;

    @Autowired
    private ShipperService shipperService;

    @Autowired
    private TokenProvider tokenProvider;

    // Bean으로 작성해도 됨
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup/carrier")
    public ResponseEntity<?> registerUser(@RequestBody CarrierResponseDTO carrierResponseDTO) {
        try {
            // 요청을 이용해 저장할 사용자 만들기
            // 서비스를 이용해 리포지터리에 사용자 저장
            carrierService.findByEmailCheck(carrierResponseDTO);

            return ResponseEntity.ok().body(carrierResponseDTO);
        } catch (Exception e) {
            // 사용자 정보는 항상 하나이므로 리스트로 만들어야 하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴

            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/signup/shipper")
    public ResponseEntity<?> registerUser(@RequestBody ShipperResponseDTO shipperResponseDTO) {
        try {
            // 요청을 이용해 저장할 사용자 만들기
            // 서비스를 이용해 리포지터리에 사용자 저장
            shipperService.findByEmailCheck(shipperResponseDTO);

            return ResponseEntity.ok().body(shipperResponseDTO);
        } catch (Exception e) {
            // 사용자 정보는 항상 하나이므로 리스트로 만들어야 하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴

            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
        CarrierInfo user1 = carrierService.getByCredentials(userDTO.getEmail(), userDTO.getPw(), passwordEncoder);
        ShipperInfo user2 = shipperService.getByCredentials(userDTO.getEmail(), userDTO.getPw(), passwordEncoder);

        if(user1 != null) {
            // 토큰 생성
            final String token = tokenProvider.create1(user1);
            final UserDTO responseUserDTO = UserDTO.builder()
                    .name(user1.getName())
                    .email(user1.getEmail())
                    .pw(user1.getPassword())
                    .token(token)
                    .typed("Carrier")
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        } else if(user2 != null) {
            // 토큰 생성
            final String token = tokenProvider.create2(user2);
            final UserDTO responseUserDTO = UserDTO.builder()
                    .name(user2.getName())
                    .email(user2.getEmail())
                    .pw(user2.getPassword())
                    .token(token)
                    .typed("Shipper")
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        } else {

            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error("Login faild.")
                    .build();
            return ResponseEntity.badRequest().body(responseDTO);
        }


    }
}
