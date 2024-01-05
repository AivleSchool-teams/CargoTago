package com.example.truck.CarrierList;

import com.example.truck.RegistInfo.RegistInfo;
import com.example.truck.RegistInfo.RegistInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrierListService {

    @Autowired
    private RegistInfoRepository registInfoRepository;

    public List<RegistInfo> getAllRegistInfo() {
        return registInfoRepository.findAll();
    }
}
