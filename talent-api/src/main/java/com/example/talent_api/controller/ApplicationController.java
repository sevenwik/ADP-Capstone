package com.example.talent_api.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.talent_api.model.Application;
import com.example.talent_api.model.ApplicationJob;
import com.example.talent_api.model.Job;
import com.example.talent_api.repository.ApplicationRepository;
import com.example.talent_api.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    ApplicationRepository appRepository;

    @Autowired
    private JobRepository jobRepository;

    @GetMapping("/applications")
    public List<Application> getAll(){
        return appRepository.findAll();
    }

    @GetMapping("/applications/{id}")
    public Optional<Application> getById(@PathVariable(value="id") Long id) {
        return appRepository.findById(id);
    }

    @GetMapping("/applications/job/{jobID}")
    public List<Application> getByJobId(@PathVariable(value="jobID") Long jobId) {
        return appRepository.getByJobId(jobId);
    }

    @GetMapping("/applications/user/{userId}")
    public ResponseEntity<List<ApplicationJob>> getByUserId(@PathVariable(value="userId") Long userId) {
        List<Application> applications = appRepository.getByUserId(userId);
        if (applications.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ApplicationJob> response = applications.stream()
                .map(application -> {
                    Optional<Job> jobOpt = jobRepository.findById(application.getJobId());
                    Job job = jobOpt.orElse(null);
                    return new ApplicationJob(application, job);
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
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
        	appToUpdate.get().setJobId(appUpdates.getJobId());
            appToUpdate.get().setUserId(appUpdates.getUserId());
        	appToUpdate.get().setDateApplied(appUpdates.getDateApplied());
        	appToUpdate.get().setCoverLetter(appUpdates.getCoverLetter());
        	appToUpdate.get().setCustomResume(appUpdates.getCustomResume());
        	appToUpdate.get().setApplication_status(appUpdates.getApplication_status());
            return appRepository.save(appToUpdate.get());
        }
        return null;
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<?> delete(@PathVariable(value="id") Long id){
        appRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
