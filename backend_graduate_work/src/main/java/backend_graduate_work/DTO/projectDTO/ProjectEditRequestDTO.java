package backend_graduate_work.DTO.projectDTO;

import backend_graduate_work.models.Project;
import backend_graduate_work.models.ProjectType;
import backend_graduate_work.models.SubprojectType;
import backend_graduate_work.models.User;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
public class ProjectEditRequestDTO {
    private long id;
    private String title;
    private String description;
    private BigDecimal budget;
    private Timestamp deadline;
    private User freelancer;
    private String status;
    private ProjectType projectType;
    private SubprojectType subprojectType;
}
