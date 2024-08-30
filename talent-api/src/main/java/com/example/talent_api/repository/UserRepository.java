package com.example.talent_api;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<com.example.talent_api.User, Long> {
    // This method will automatically be translated to a JPQL query
    com.example.talent_api.User findByUsername(String username);
}
