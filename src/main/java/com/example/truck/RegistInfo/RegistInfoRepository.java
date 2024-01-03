package com.example.truck.RegistInfo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RegistInfoRepository extends JpaRepository<RegistInfo, Long> {

    Optional<RegistInfo> findByUsername(String username);
    List<RegistInfo> findByShipperInfo_ShipMember(Long shipMember);
}
