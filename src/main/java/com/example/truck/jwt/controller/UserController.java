package com.example.truck.jwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.truck.jwt.service.CarrierService; // 이거 빼도 되는 코드 아닌가용? -> 작성자가 확인 후 삭제해 주세욥


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private CarrierService carrierService; // 이거 빼도 되는 코드 아닌가용? -> 작성자가 확인 후 삭제해 주세욥

    @GetMapping("/mainpage")
    public String getUserDetails() {
        // SecurityContext에서 인증 정보를 가져옵니다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 해당 이메일을 가진 사용자의 정보를 조회합니다.
        return authentication.getName();

    }
}

