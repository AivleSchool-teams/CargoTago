package com.example.truck.ShipperRegistration;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.truck.CarrierRegistration.CarrierInfo;
public interface ShipperInfoRepository extends JpaRepository<ShipperInfo, Long> {

    Optional<ShipperInfo> findByEmail(String email);
}

