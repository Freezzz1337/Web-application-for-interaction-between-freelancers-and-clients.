package backend_graduate_work.DTO.projectCommentDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCommentCreateRequestDTO {
    private String projectId;
    private String commentText;
    private String proposedPrice;
}
