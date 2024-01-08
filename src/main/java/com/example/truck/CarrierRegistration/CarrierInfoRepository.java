package com.example.truck.CarrierRegistration;

import com.example.truck.RegistInfo.RegistInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface CarrierInfoRepository extends JpaRepository<CarrierInfo, Long> {

    Optional<CarrierInfo> findByEmail(String email);
    Optional<CarrierInfo> findByCarMember(Long carMember);

    Optional<RegistInfo> findRegistByCarMember(Long carMember);
}
