package com.example.talent_api.controller;

import java.util.List;
import java.util.Optional;

import com.example.talent_api.User;
import com.example.talent_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAll(){
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getById(@PathVariable(value="id") Long id) {
        return userRepository.findById(id);
    }

    @PostMapping("/users")
    public User create(@RequestBody com.example.talent_api.User user) {
        com.example.talent_api.User response = userRepository.saveAndFlush(user);
        return response;
    }

    @PutMapping("/users/{id}")
    public User getById(@PathVariable(value="id") Long id,
                                               @RequestBody User userUpdates) {
        Optional<User> userToUpdate = userRepository.findById(id);
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
