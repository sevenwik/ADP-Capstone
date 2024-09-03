package com.example.talent_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Manager")
public class Manager {
	@Id
	private long id;
	private long userId;
	private String fullName;
	private String email;
	private String department;
	private String phone;
	
	public Manager() {
        super();
    }

    public Manager(long id, long userId, String fullName, String email, String department, String phone) {
        super();
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.phone = phone;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
