package com.example.truck.CarrierRegistration;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CarrierInfoRepository extends JpaRepository<CarrierInfo, Long> {

    Optional<CarrierInfo> findByEmail(String email);
}
