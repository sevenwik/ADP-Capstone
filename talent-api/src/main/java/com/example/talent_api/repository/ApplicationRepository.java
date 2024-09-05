package com.example.talent_api.repository;

import com.example.talent_api.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> getByJobId(Long jobId);
    List<Application> getByUserId(Long userId);
    Page<Application> getByJobId(Long jobId, Pageable pageable);
}
