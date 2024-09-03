package com.example.talent_api.repository;

import com.example.talent_api.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
}
