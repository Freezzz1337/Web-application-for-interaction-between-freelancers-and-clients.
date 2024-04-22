package backend_graduate_work.DTO.projectDTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Setter
@Getter
public class ProjectCreateRequestDTO {
    private String title;
    private String description;
    private BigDecimal budget;
    private Timestamp deadline;
    private String projectType;
    private String subprojectType;
}
