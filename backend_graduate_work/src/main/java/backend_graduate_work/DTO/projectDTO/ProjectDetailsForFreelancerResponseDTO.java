package backend_graduate_work.DTO.projectDTO;

import backend_graduate_work.DTO.projectCommentDTO.ProjectCommentGetAllForProjectDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProjectDetailsForFreelancerResponseDTO {
    private ProjectDetailsForFreelancer projectDetailsForFreelancer;
    private List<ProjectCommentGetAllForProjectDetails> projectCommentGetAllForProjectDetails;
}