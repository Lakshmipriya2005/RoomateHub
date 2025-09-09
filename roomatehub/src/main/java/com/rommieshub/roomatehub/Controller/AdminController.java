package com.rommieshub.roomatehub.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rommieshub.roomatehub.Dtos.UserDto;

import jakarta.servlet.http.HttpServletRequest;
@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/admin")
public class AdminController {
    @Autowired
private AuthController authController;
@Autowired
private HttpServletRequest request;

@PostMapping("/signup")
public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
   
    return authController.signup(userDto);
   
}
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody UserDto userDto) {
    System.out.println("here it");
    System.out.println(userDto.getRole());

     if(userDto.getRole().toLowerCase().equals("admin"))
    return authController.login(userDto,request);
     else
    return ResponseEntity.status(403).body("Forbidden: Only admins can sign up here.");
}
    
}
