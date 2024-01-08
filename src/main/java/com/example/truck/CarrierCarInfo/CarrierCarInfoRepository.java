package com.example.truck.CarrierCarInfo;

import com.example.truck.RegistInfo.RegistInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface CarrierCarInfoRepository extends JpaRepository<CarrierCarInfo, Long> {

    Optional<CarrierCarInfo> findByUsername(String username);
    List<CarrierCarInfo> findByCarrierInfo_CarMember(Long carMember);








}
