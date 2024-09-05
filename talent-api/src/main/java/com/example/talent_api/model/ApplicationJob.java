package com.example.talent_api.model;

public class ApplicationJob {
    private Application application;

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    private Job job;

    public ApplicationJob(Application application, Job job) {
        this.application = application;
        this.job = job;
    }

}
