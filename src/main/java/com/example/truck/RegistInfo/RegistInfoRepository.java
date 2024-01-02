package com.example.truck.RegistInfo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RegistInfoRepository extends JpaRepository<RegistInfo, Long> {

    Optional<RegistInfo> findByUsername(String username);
}
