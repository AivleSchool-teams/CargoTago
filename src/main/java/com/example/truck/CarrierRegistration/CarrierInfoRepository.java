package com.example.truck.CarrierRegistration;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.truck.CarrierRegistration.CarrierInfo;
public interface CarrierInfoRepository extends JpaRepository<CarrierInfo, Long> {

    Optional<CarrierInfo> findByEmail(String email);
}
