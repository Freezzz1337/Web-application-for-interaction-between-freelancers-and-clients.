package backend_graduate_work.DTO.projectDTO;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectGetAllForEmployerResponseDTO {
    private long id;
    private String title;
    private String status;
    private int amountOfComments;
}