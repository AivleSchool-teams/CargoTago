package com.example.truck.Approve;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.CarrierRegistration.CarrierInfoDTO;
import com.example.truck.CarrierRegistration.CarrierInfoRepository;
import com.example.truck.DTO.PageDTO;
import com.example.truck.Posts.PostsInfo;
import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime; // LocalDateTime import 추가
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.File;
import java.util.Optional;
import com.example.truck.Approve.ApproveService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/carrier")
@RequiredArgsConstructor
public class ApproveController {

    private final ApproveService approveService;
    private final CarrierInfoRepository carrierInfoRepository;

    @Autowired
    private RegistInfoRepository registInfoRepository; // 예시 리포지토리

    @GetMapping("/AIselect/{id}")
    public RegistInfo one(@PathVariable Long id) {
        return approveService.one(id);
    }

    @GetMapping("/recipt/{id}")
    public RegistInfo two(@PathVariable Long id) {
        return approveService.one(id);
    }


    @PostMapping("/approve/{id}")
    public Integer approve(@PathVariable Long id, @RequestBody String useremail) {

        // id에 걸맞는 화물을 불러와서
        // update하는 ㅂ아법
        Optional<CarrierInfo> carrierInfoOptional = carrierInfoRepository.findByEmail(useremail);
        if (carrierInfoOptional.isPresent()) {
            CarrierInfo carrierInfo = carrierInfoOptional.get();

            Long carmember = carrierInfo.getCarMember(); // car_member 값 가져오기

            Optional<RegistInfo> registInfoOptional = registInfoRepository.findById(id);

            if (registInfoOptional.isPresent()) {
                RegistInfo registInfo = registInfoOptional.get();

                registInfo.setCarrierInfo(carrierInfo);

                if (registInfo.getStatus() == 0) {
                    registInfo.setStatus(1);
                    registInfoRepository.save(registInfo);

                    return 1;
                }

            }

        }

        return 0;

    }

}
