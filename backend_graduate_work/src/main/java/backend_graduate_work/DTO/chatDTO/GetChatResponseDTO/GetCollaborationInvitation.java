package backend_graduate_work.DTO.chatDTO.GetChatResponseDTO;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Builder
public class GetCollaborationInvitation {
    private long id;
    private BigDecimal budget;
    private String projectName;

    private Timestamp createdAt;
    private Timestamp deadline;
    private String status;
}
