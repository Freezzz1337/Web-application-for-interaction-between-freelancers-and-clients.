package backend_graduate_work.DTO.chatDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendMessageRequestDTO {
    private long chatId;
    private String textMessage;
    private byte[] file;
    private String fileName;
}