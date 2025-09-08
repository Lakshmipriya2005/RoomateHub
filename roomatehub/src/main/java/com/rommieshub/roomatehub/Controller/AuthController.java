package com.rommieshub.roomatehub.Controller;



import java.util.HashMap;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RestController;

import com.rommieshub.roomatehub.Dtos.UserDto;
import com.rommieshub.roomatehub.Repository.UserRepo;
import com.rommieshub.roomatehub.Service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;




@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;
    

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        System.out.println("Signup endpoint hit");
        String rsponse=userService.register(userDto);
        
        return ResponseEntity.ok(rsponse);
    }
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody UserDto userDto, HttpServletRequest request) {
    String jwt = userService.authenticate(userDto);
    // System.out.println(jwt);

    if (!jwt.equals("fail")) {
        HttpSession session = request.getSession(true); 
        session.setAttribute("username", userDto.getUsername());
        int userId = userRepo.getIdByName(userDto.getUsername());
        Map<String, String> tokenResponse = new HashMap<>();
        tokenResponse.put("token", jwt);
        tokenResponse.put("username", userDto.getUsername());
        tokenResponse.put("id", String.valueOf(userId));
        return ResponseEntity.ok(tokenResponse);
    } else {
        return ResponseEntity.status(401).body("Invalid username or password");
    }
}

  
}
