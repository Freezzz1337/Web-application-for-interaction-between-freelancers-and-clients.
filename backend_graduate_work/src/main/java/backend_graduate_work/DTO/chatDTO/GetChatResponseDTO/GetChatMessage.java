package backend_graduate_work.DTO.chatDTO.GetChatResponseDTO;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class GetChatMessage {
    private long messageId;
    private Sender sender;
    private String messageText;

    private String fileName;
    private byte[] file;

    private Timestamp createdAt;
}
