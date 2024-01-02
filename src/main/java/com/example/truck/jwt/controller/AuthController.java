package com.example.truck.jwt.controller;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.jwt.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.truck.jwt.dto.ResponseDTO;
import com.example.truck.jwt.dto.UserResponseDTO;
import com.example.truck.jwt.security.TokenProvider;
import com.example.truck.jwt.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    // Bean으로 작성해도 됨
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserResponseDTO userResponseDTO) {
        try {
            // 요청을 이용해 저장할 사용자 만들기
            // 서비스를 이용해 리포지터리에 사용자 저장
            userService.findByEmailCheck(userResponseDTO);

            return ResponseEntity.ok().body(userResponseDTO);
        } catch (Exception e) {
            // 사용자 정보는 항상 하나이므로 리스트로 만들어야 하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴

            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
        CarrierInfo user = userService.getByCredentials(userDTO.getEmail(), userDTO.getPw(), passwordEncoder);

        if(user != null) {
            // 토큰 생성
            final String token = tokenProvider.create(user);
            final UserDTO responseUserDTO = UserDTO.builder()
                    .email(user.getEmail())
                    .pw(user.getPassword())
                    .token(token)
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
