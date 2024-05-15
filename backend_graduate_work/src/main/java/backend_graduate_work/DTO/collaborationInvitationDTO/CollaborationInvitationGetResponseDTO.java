package backend_graduate_work.DTO.collaborationInvitationDTO;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Builder
public class CollaborationInvitationGetResponseDTO {
    private String title;
    private String projectName;
    private BigDecimal budget;
    private Timestamp deadline;
}
