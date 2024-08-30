package com.example.talent_api.controller;

import com.example.talent_api.User;
import com.example.talent_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<User> create(@RequestBody User credentials) {
        if(credentials.getUsername() == null || credentials.getPassword() == null) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
        }
        com.example.talent_api.User user = userRepository.findByUsername(credentials.getUsername());
        if(user == null) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(401));
        }
        if(user.getPassword().equalsIgnoreCase(credentials.getPassword() )) {
            return ResponseEntity.status(200).body(user);
        }else {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(401));
        }
    }

}
