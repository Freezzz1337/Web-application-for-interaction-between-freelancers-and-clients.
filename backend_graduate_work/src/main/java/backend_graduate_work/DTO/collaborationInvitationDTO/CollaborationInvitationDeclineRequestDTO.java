package backend_graduate_work.DTO.collaborationInvitationDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollaborationInvitationDeclineRequestDTO {
    private String projectId;
    private String freelancerId;
}