package backend_graduate_work.DTO.projectDTO.ProjectDetailsForEmployerResponseDTO;

import backend_graduate_work.DTO.projectCommentDTO.ProjectCommentGetAllForProjectDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProjectDetailsForEmployerResponseDTO {
    private ProjectDetailsForEmployer projectDetailsForEmployer;
    private List<ProjectCommentGetAllForProjectDetails> projectCommentGetAllForProjectDetails;
}
