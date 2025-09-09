package com.rommieshub.roomatehub.Service;




import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rommieshub.roomatehub.Dtos.UserDto;
import com.rommieshub.roomatehub.Entity.UserEntity;
import com.rommieshub.roomatehub.Repository.UserRepo;

import org.springframework.security.core.Authentication;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
     @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;
    public String register(UserDto dto) {
        if (userRepository.findByUsername(dto.getUsername())!=null) {
            throw new RuntimeException("User already exists");
        }
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        System.out.println("Came here");
        UserEntity user = new UserEntity();
        UserDto usersecDto = new UserDto();
        usersecDto.setUsername(dto.getUsername());
        usersecDto.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setUsername(dto.getUsername());
        user.setMobileNumber(dto.getMobileNumber());
        user.setAge(dto.getAge());
        user.setRole("admin");
        userRepository.save(user);

       UserEntity usr=userRepository.findByUsername(dto.getUsername());
       System.out.println(usr.getId());
        return "User registered successfully!";
    }

    @Transactional
    public String authenticate(UserDto user) {
       Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
   if (authentication.isAuthenticated()) 
        {
         return jwtService.generateToken(user.getUsername());
        } else 
        {
            return "fail";
        }
    }
}
