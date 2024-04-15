package backend_graduate_work.DTO.requestDTO;

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
}
