package backend_graduate_work.DTO.collaborationInvitationDTO.checkDeadlinDTO;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
public class CheckDeadlineDTO {
    List<CheckDeadline> checkDeadlines;
}
