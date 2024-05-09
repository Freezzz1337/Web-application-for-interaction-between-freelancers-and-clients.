package backend_graduate_work.DTO.chatMessageDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatResponseFromEmployerToCommentRequestDTO {
    private long freelancerId;
    private long projectId;
    private String message;
}