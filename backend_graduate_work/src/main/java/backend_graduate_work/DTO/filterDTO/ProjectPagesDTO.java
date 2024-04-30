package backend_graduate_work.DTO.filterDTO;

import backend_graduate_work.DTO.projectDTO.ProjectGetAllForFreelancerResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ProjectPagesDTO {
    private List<ProjectGetAllForFreelancerResponseDTO> listOfProjects;
    private int numberOfProjects;
}
