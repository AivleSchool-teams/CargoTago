package com.example.truck;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class TruckApplication {

    public static void main(String[] args) {
        SpringApplication.run(TruckApplication.class, args);
    }

}
