package com.example.talent_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Job")
public class Job {
	@Id
	private long id;
	private long managerId;
	private String department;
	private String listingTitle;
	private String dateListed;
	private String dateClosed;
	private String jobTitle;
	private String jobDescription;
	private String additionalInfo;
	private String listingStatus;
	
	public Job() {
        super();
    }

    public Job(long id, long managerId, String department, String listingTitle, String dateListed, String dateClosed, String jobTitle, String jobDescription, String additionalInfo, String listingStatus) {
        super();
        this.id = id;
        this.managerId = managerId;
        this.department = department;
        this.listingTitle = listingTitle;
        this.dateListed = dateListed;
        this.dateClosed = dateClosed;
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.additionalInfo = additionalInfo;
        this.listingStatus = listingStatus;
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

    public void setManagerId(long managerId) {
        this.managerId = managerId;
    }
    
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getListingTitle() {
        return listingTitle;
    }

    public void setListingTitle(String listingTitle) {
        this.listingTitle = listingTitle;
    }
    
    public String getDateListed() {
        return dateListed;
    }

    public void setDateListed(String dateListed) {
        this.dateListed = dateListed;
    }

    public String getDateClosed() {
        return dateClosed;
    }

    public void setDateClosed(String dateClosed) {
        this.dateClosed = dateClosed;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public String getListingStatus() {
        return listingStatus;
    }

    public void setListingStatus(String listingStatus) {
        this.listingStatus = listingStatus;
    }
}
