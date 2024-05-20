package backend_graduate_work.DTO.userDTO.UserProfileResponseDTO;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileProjectStatistics {
    private int numberOfProjects;
    private int numberOfActiveProjects;
    private int numberOfCompletedProjects;
}
