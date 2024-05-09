package backend_graduate_work.DTO.chatDTO;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetChatProjectResponseDTO {
    private String projectName;
    private long projectId;
    private String status;
}
