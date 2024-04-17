package backend_graduate_work.DTO.projectDTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class ProjectGetAllForEmployerResponseDTO {
    private long id;
    private String title;
    private String status;
}