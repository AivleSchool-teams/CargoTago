package com.example.truck.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/auth/**", config);
        source.registerCorsConfiguration("/user/**", config);
        source.registerCorsConfiguration("/api/**", config);
        source.registerCorsConfiguration("/post/**", config);
        source.registerCorsConfiguration("/carrier/AIselect/**", config);
        source.registerCorsConfiguration("/carrier/recipt/**", config);
        source.registerCorsConfiguration("/carrier/approve/**", config);
        source.registerCorsConfiguration("/carrier/mypage/**", config);
        source.registerCorsConfiguration("/uploads/**", config);
        return new CorsFilter(source);
    }
}
