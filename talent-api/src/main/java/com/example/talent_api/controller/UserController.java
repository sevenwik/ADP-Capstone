package com.example.talent_api.controller;

import java.util.List;
import java.util.Optional;

import com.example.talent_api.model.Candidate;
import com.example.talent_api.model.User;
import com.example.talent_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
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
    public ResponseEntity<Object> create(@RequestBody User user) {
        User u = userRepository.findByUsername(user.getUsername());
        if(u != null){
            if(u.getUsername()!=user.getUsername())
            {

                return new ResponseEntity<>("User already exists", HttpStatusCode.valueOf(409));
            }
        }
        User response = userRepository.saveAndFlush(user);
        return new ResponseEntity<>(response,HttpStatusCode.valueOf(200));
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
