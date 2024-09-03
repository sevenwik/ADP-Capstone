package com.example.talent_api.controller;

import java.util.List;
import java.util.Optional;

import com.example.talent_api.model.Application;
import com.example.talent_api.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    ApplicationRepository appRepository;

    @GetMapping("/applications")
    public List<Application> getAll(){
        return appRepository.findAll();
    }

    @GetMapping("/applications/{id}")
    public Optional<Application> getById(@PathVariable(value="id") Long id) {
        return appRepository.findById(id);
    }

    @PostMapping("/applications")
    public Application create(@RequestBody Application app) {
        Application response = appRepository.saveAndFlush(app);
        return response;
    }

    @PutMapping("/applications/{id}")
    public Application getById(@PathVariable(value="id") Long id,
                                               @RequestBody Application appUpdates) {
        Optional<Application> appToUpdate = appRepository.findById(id);
        if(appToUpdate.isPresent()) {
        	appToUpdate.get().setJobId(appUpdates.getId());
        	appToUpdate.get().setDateApplied(appUpdates.getDateApplied());
        	appToUpdate.get().setCoverLetter(appUpdates.getCoverLetter());
        	appToUpdate.get().setCustomResume(appUpdates.getCustomResume());
        	appToUpdate.get().setAppStatus(appUpdates.getAppStatus());
            appRepository.save(appToUpdate.get());
            return appToUpdate.get();
        }
        return null;
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<?> delete(@PathVariable(value="id") Long id){
        appRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
