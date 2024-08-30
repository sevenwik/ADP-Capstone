package com.example.talent_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Candidate")
public class Candidate {

    @Id
    private long id;
    private long user_id;
    private String full_name;
    private String email;
    private String address;
    private String phone;
    private String resume;

    public Candidate(){
        super();
    }
    public Candidate(long id, long user_id, String full_name, String email, String address, String phone, String resume) {
        this.id = id;
        this.user_id = user_id;
        this.full_name = full_name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.resume = resume;
    }

    public long getId() {
        return id;
    }

    public long getUser_id() {
        return user_id;
    }

    public String getFull_name() {
        return full_name;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public String getResume() {
        return resume;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }
}
