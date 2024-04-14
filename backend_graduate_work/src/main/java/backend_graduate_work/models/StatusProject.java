package backend_graduate_work.models;

import lombok.Getter;

@Getter
public enum StatusProject {
    OPEN("OPEN"),
    IN_PROGRESS("IN_PROGRESS"),
    COMPLETED("COMPLETED"),
    CANCELLED("CANCELLED");

    private final String statusProject;

    StatusProject(String statusProject) {
        this.statusProject = statusProject;
    }
}
