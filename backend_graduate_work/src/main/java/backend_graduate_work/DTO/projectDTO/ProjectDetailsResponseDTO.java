package backend_graduate_work.DTO.projectDTO;

import backend_graduate_work.models.User;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Builder
@Getter
public class ProjectDetailsResponseDTO {
    private long id;
    private String title;
    private String description;
    private BigDecimal budget;
    private Timestamp deadline;
    private User freelancer;
    private String status;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}