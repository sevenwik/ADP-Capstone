package com.example.talent_api.model;

import jakarta.persistence.*;

@Entity
@Table(name="Job")
public class Job {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    @Column(name="manager_id")
	private long managerId;
	private String department;
	private String listing_title;
	private String date_listed;
	private String date_closed;
	private String job_title;
	private String job_description;
	private String additional_information;
	private String listing_status;
	
	public Job() {
        super();
    }

    public Job(long id, long manager_id, String department, String listing_title, String date_listed, String date_closed, String job_title, String job_description, String additional_information, String listing_status) {
        super();
        this.id = id;
        this.managerId = manager_id;
        this.department = department;
        this.listing_title = listing_title;
        this.date_listed = date_listed;
        this.date_closed = date_closed;
        this.job_title = job_title;
        this.job_description = job_description;
        this.additional_information = additional_information;
        this.listing_status = listing_status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    public long getManagerId() {
        return managerId;
    }

    public void setManagerId(long manager_id) {
        this.managerId = manager_id;
    }
    
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getListingTitle() {
        return listing_title;
    }

    public void setListingTitle(String listing_title) {
        this.listing_title = listing_title;
    }
    
    public String getDateListed() {
        return date_listed;
    }

    public void setDateListed(String date_listed) {
        this.date_listed = date_listed;
    }

    public String getDateClosed() {
        return date_closed;
    }

    public void setDateClosed(String date_closed) {
        this.date_closed = date_closed;
    }

    public String getJobTitle() {
        return job_title;
    }

    public void setJobTitle(String job_title) {
        this.job_title = job_title;
    }

    public String getJobDescription() {
        return job_description;
    }

    public void setJobDescription(String job_description) {
        this.job_description = job_description;
    }

    public String getAdditionalInfo() {
        return additional_information;
    }

    public void setAdditionalInfo(String additional_information) {
        this.additional_information = additional_information;
    }

    public String getListingStatus() {
        return listing_status;
    }

    public void setListingStatus(String listing_status) {
        this.listing_status = listing_status;
    }
}
