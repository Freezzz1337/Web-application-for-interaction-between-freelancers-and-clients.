package backend_graduate_work.DTO.chatDTO.GetChatResponseDTO;


import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Sender {
    private String fullName;
    @Lob
    private byte[] profilePicture;
    private long senderId;
}
