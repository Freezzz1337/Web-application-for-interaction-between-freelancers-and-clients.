package backend_graduate_work.DTO.collaborationInvitationDTO;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class CollaborationInvitationCreateRequestDTO {
    private String freelancerId;
    private String projectId;
    private String newBudget;
    private Timestamp newDeadline;
}
