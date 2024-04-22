package backend_graduate_work.DTO.projectDTO;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProjectGetAllTypesResponseDTO {
    private long id;
    private String name;
}