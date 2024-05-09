package backend_graduate_work.DTO.chatDTO.GetChatResponseDTO;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetChatResponseDTO {
    private long chatId;
    private List<GetChatMessage> chatMessageList;
}
