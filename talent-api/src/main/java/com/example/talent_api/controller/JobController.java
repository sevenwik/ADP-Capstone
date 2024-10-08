package com.example.talent_api.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.example.talent_api.model.Job;
import com.example.talent_api.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class JobController {

    @Autowired
    JobRepository jobRepository;

    @GetMapping("/jobs")
    public List<Job> getAll(){
        return jobRepository.findAll();
    }

    @GetMapping("/jobs/pagination")
    public List<Job> getPaginatedJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return jobRepository.findAll(pageable).getContent();
    }

    @GetMapping("/jobs/{id}")
    public Optional<Job> getById(@PathVariable(value="id") Long id) {
        return jobRepository.findById(id);
    }

    @GetMapping("/jobs/manager/{managerId}")
    public List<Job> getByManagerId(@PathVariable(value="managerId") Long managerId) {
       return jobRepository.findByManagerId(managerId);
    }

    @PostMapping("/jobs")
    public Job create(@RequestBody Job job) {
        Job response = jobRepository.saveAndFlush(job);
        return response;
    }

    @PutMapping("/jobs/{id}")
    public Job getById(@PathVariable(value="id") Long id,
                                               @RequestBody Job jobUpdates) {
        Optional<Job> jobToUpdate = jobRepository.findById(id);
        if(jobToUpdate.isPresent()) {
        	jobToUpdate.get().setManagerId(jobUpdates.getManagerId());
        	jobToUpdate.get().setDepartment(jobUpdates.getDepartment());
        	jobToUpdate.get().setListingTitle(jobUpdates.getListingTitle());
            jobToUpdate.get().setJobTitle(jobUpdates.getJobTitle());
            jobToUpdate.get().setJobDescription(jobUpdates.getJobDescription());
            jobToUpdate.get().setAdditionalInfo(jobUpdates.getAdditionalInfo());
            jobToUpdate.get().setListingStatus(jobUpdates.getListingStatus());
            jobToUpdate.get().setDateListed(jobUpdates.getDateListed());
            jobToUpdate.get().setDateClosed(jobUpdates.getDateClosed());
            jobRepository.save(jobToUpdate.get());
            return jobToUpdate.get();
        }
        return null;
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> delete(@PathVariable(value="id") Long id){
        jobRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
