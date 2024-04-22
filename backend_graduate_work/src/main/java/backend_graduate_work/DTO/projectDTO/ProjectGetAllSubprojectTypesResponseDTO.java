package backend_graduate_work.DTO.projectDTO;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectGetAllSubprojectTypesResponseDTO {
    private long id;
    private String name;
}
