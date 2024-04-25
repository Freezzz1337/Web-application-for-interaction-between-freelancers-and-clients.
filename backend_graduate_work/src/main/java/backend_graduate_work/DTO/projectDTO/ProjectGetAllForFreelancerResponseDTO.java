package backend_graduate_work.DTO.projectDTO;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;

@Getter
@Builder
public class ProjectGetAllForFreelancerResponseDTO {
    private long id;
    private String title;
    private BigDecimal budget;
    private String description;
    private Timestamp deadline;
    private Timestamp created_at;
}
