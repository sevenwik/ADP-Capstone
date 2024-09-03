package com.example.talent_api.repository;

import com.example.talent_api.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
