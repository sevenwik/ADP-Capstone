package com.example.talent_api.controller;

import java.util.List;
import java.util.Optional;

import com.example.talent_api.model.Manager;
import com.example.talent_api.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class ManagerController {

    @Autowired
    ManagerRepository managerRepository;

    @GetMapping("/managers")
    public List<Manager> getAll(){
        return managerRepository.findAll();
    }

    @GetMapping("/managers/{id}")
    public Optional<Manager> getById(@PathVariable(value="id") Long id) {
        return managerRepository.findById(id);
    }

    @PostMapping("/managers")
    public Manager create(@RequestBody Manager manager) {
        Manager response = managerRepository.saveAndFlush(manager);
        return response;
    }

    @PutMapping("/managers/{id}")
    public Manager getById(@PathVariable(value="id") Long id,
                                               @RequestBody Manager managerUpdates) {
        Optional<Manager> managerToUpdate = managerRepository.findById(id);
        if(managerToUpdate.isPresent()) {
            managerToUpdate.get().setFullName(managerUpdates.getFullName());
            managerToUpdate.get().setEmail(managerUpdates.getEmail());
            managerToUpdate.get().setDepartment(managerUpdates.getDepartment());
            managerToUpdate.get().setPhone(managerUpdates.getPhone());
            managerRepository.save(managerToUpdate.get());
            return managerToUpdate.get();
        }
        return null;
    }

    @DeleteMapping("/managers/{id}")
    public ResponseEntity<?> delete(@PathVariable(value="id") Long id){
        managerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}