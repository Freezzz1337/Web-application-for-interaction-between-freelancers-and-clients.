package backend_graduate_work.DTO.chatDTO;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class GetChatUserResponseDTO {
    private String fullName;
    private String lastMessage;
    private Timestamp lastMessageTime;
    @Lob
    private byte[] userPicture;
    private long userId;
}
