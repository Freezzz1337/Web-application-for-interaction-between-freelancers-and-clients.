package backend_graduate_work.DTO.projectDTO.ProjectDetailsForEmployerResponseDTO;

import backend_graduate_work.models.ProjectType;
import backend_graduate_work.models.SubprojectType;
import backend_graduate_work.models.User;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Builder
@Getter
public class ProjectDetailsForEmployer {
    private long id;
    private String title;
    private String description;
    private BigDecimal budget;
    private Timestamp deadline;
    private User freelancer;
    private String status;
    private ProjectType projectType;
    private SubprojectType subprojectType;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}