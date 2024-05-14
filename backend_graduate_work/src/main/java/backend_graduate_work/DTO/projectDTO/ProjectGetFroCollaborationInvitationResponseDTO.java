package backend_graduate_work.DTO.projectDTO;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Builder
public class ProjectGetFroCollaborationInvitationResponseDTO {
    private String title;
    private BigDecimal budget;
    private Timestamp deadline;
}
