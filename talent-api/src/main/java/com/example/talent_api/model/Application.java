package com.example.talent_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Application")
public class Application {
	@Id
	private long id;
	private long user_id;
	private long job_id;
	private String date_applied;
	private String cover_letter;
	private String custom_resume;
	private String application_status;
	
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

    public long getJobId() {
        return job_id;
    }

    public void setJobId(long job_id) {
        this.job_id = job_id;
    }

    public String getDateApplied() {
        return date_applied;
    }

    public void setDateApplied(String date_applied) {
        this.date_applied = date_applied;
    }

    public String getCoverLetter() {
        return cover_letter;
    }

    public void setCoverLetter(String cover_letter) {
        this.cover_letter = cover_letter;
    }

    public String getCustomResume() {
        return custom_resume;
    }

    public void setCustomResume(String custom_resume) {
        this.custom_resume = custom_resume;
    }

    public String getAppStatus() {
        return application_status;
    }

    public void setAppStatus(String application_status) {
        this.application_status = application_status;
    }
}
