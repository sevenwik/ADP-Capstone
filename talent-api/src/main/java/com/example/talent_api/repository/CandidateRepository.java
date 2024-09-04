package com.example.talent_api.repository;

import com.example.talent_api.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate,Long> {
    List<Candidate> findByEmail(String email);
}
