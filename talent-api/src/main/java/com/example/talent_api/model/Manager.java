package com.example.talent_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Manager")
public class Manager {
	@Id
	private long id;
	private long user_id;
	private String full_name;
	private String email;
	private String department;
	private String phone;
	
	public Manager() {
        super();
    }

    public Manager(long id, long user_id, String full_name, String email, String department, String phone) {
        super();
        this.id = id;
        this.user_id = user_id;
        this.full_name = full_name;
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
        return user_id;
    }

    public void setUserId(long user_id) {
        this.user_id = user_id;
    }

    public String getFullName() {
        return full_name;
    }

    public void setFullName(String full_name) {
        this.full_name = full_name;
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
