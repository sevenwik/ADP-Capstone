package com.example.talent_api.repository;

import com.example.talent_api.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByManagerId(Long manager_id);
}
