package com.example.talent_api.repository;

import com.example.talent_api.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {
    // This method will automatically be translated to a JPQL query
}
