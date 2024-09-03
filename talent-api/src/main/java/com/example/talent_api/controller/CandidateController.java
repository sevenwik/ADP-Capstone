package com.example.talent_api.controller;

import com.example.talent_api.model.Candidate;
import com.example.talent_api.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class CandidateController {

    @Autowired
    CandidateRepository candidateRepository;

    @GetMapping("/candidates")
    public List<Candidate> getAll(){
        return candidateRepository.findAll();
    }

    @GetMapping("/candidates/{id}")
    public Optional<Candidates> getById(@PathVariable(value="id") Long id) {
        return candidateRepository.findById(id);
    }

    @PostMapping("/candidates")
    public Candidate create(@RequestBody Candidate candidate) {
        Candidate response = candidateRepository.saveAndFlush(candidate);
        return response;
    }

    @PutMapping("/candidates/{id}")
    public Candidate getById(@PathVariable(value="id") Long id,
                                               @RequestBody Candidate candidateUpdates) {
        Optional<Candidate> candidateToUpdate = candidateRepository.findById(id);
        if(candidateToUpdate.isPresent()) {
            candidateToUpdate.get().setFullName(candidateUpdates.getFullName());
            candidateToUpdate.get().setEmail(candidateUpdates.getEmail());
            candidateToUpdate.get().setAddress(candidateUpdates.getAddress());
            candidateToUpdate.get().setPhone(candidateUpdates.getPhone());
            candidateToUpdate.get().setResume(candidateUpdates.getResume());
            return candidateToUpdate.get();
        }
        return null;
    }

    @DeleteMapping("/candidates/{id}")
    public ResponseEntity<?> delete(@PathVariable(value="id") Long id){
        candidateRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}