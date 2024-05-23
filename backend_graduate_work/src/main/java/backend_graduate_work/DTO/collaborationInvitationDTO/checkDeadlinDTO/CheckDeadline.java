package backend_graduate_work.DTO.collaborationInvitationDTO.checkDeadlinDTO;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class CheckDeadline {
    private Timestamp deadline;
    private String projectName;
}
