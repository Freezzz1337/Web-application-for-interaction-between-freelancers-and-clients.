package backend_graduate_work.DTO.projectDTO;

import backend_graduate_work.models.ProjectType;
import backend_graduate_work.models.SubprojectType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Builder
@Getter
public class ProjectDetailsForFreelancer {

    private long id;
    private String title;
    private String description;
    private BigDecimal budget;
    private Timestamp deadline;
    private String status;
    private ProjectType projectType;
    private SubprojectType subprojectType;
    private Timestamp createdAt;
}