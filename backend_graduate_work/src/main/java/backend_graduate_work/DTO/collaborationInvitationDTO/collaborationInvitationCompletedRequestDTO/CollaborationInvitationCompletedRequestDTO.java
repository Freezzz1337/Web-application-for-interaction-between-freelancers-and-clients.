package backend_graduate_work.DTO.collaborationInvitationDTO.collaborationInvitationCompletedRequestDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollaborationInvitationCompletedRequestDTO {
    private String freelancerId;
    private String projectId;
    private ReviewCompleted review;
}
