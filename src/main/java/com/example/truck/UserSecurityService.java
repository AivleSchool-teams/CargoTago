package com.example.truck;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.truck.CarrierRegistration.CarrierInfo;
import com.example.truck.CarrierRegistration.CarrierInfoRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException; //흠흠
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserSecurityService implements UserDetailsService {

    private final CarrierInfoRepository carrierInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<CarrierInfo> _carrierInfo = this.carrierInfoRepository.findByEmail(email);
        if (_carrierInfo.isEmpty()) {
            throw new UsernameNotFoundException("사용자를 찾을수 없습니다.");
        }
        CarrierInfo carrierInfo = _carrierInfo.get();
        List<GrantedAuthority> authorities = new ArrayList<>();
        if ("admin".equals(email)) {
            authorities.add(new SimpleGrantedAuthority(UserRole.ADMIN.getValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(UserRole.USER.getValue()));
        }
        return new User(carrierInfo.getEmail(), carrierInfo.getPassword(), authorities);
    }
}
