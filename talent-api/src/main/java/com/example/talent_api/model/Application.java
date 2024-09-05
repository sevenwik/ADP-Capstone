package com.example.talent_api.model;

import jakarta.persistence.*;

@Entity
@Table(name="Application")
public class Application {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    @Column(name="user_id")
	private long userId;
    @Column(name="job_id")
	private long jobId;
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
        return userId;
    }

    public void setUserId(long user_id) {
        this.userId = user_id;
    }

    public long getJobId() {
        return jobId;
    }

    public void setJobId(long job_id) {
        this.jobId = job_id;
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

    public String getApplication_status() {
        return application_status;
    }

    public void setApplication_status(String application_status) {
        this.application_status = application_status;
    }
}
