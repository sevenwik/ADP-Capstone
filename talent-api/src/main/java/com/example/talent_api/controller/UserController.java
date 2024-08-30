package com.example.talent_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    com.example.talent_api.UserRepository userRepository;

    @GetMapping("/users")
    public List<com.example.talent_api.User> getAll(){
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public Optional<com.example.talent_api.User> getById(@PathVariable(value="id") Long id) {
        return userRepository.findById(id);
    }

    @PostMapping("/users")
    public com.example.talent_api.User create(@RequestBody com.example.talent_api.User user) {
        com.example.talent_api.User response = userRepository.saveAndFlush(user);
        return response;
    }

    @PutMapping("/users/{id}")
    public com.example.talent_api.User getById(@PathVariable(value="id") Long id,
                                               @RequestBody com.example.talent_api.User userUpdates) {
        Optional<com.example.talent_api.User> userToUpdate = userRepository.findById(id);
        if(userToUpdate.isPresent()) {
            userToUpdate.get().setUsername(userUpdates.getUsername());
            userToUpdate.get().setPassword(userUpdates.getPassword());
            userToUpdate.get().setType(userUpdates.getType());
            userRepository.save(userToUpdate.get());
            return userToUpdate.get();
        }
        return null;
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> delete(@PathVariable(value="id") Long id){
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
