package backend_graduate_work.DTO.userDTO.UserProfileResponseDTO;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class UserProfileResponseDTO {
    private UserProfileData userProfileData;
    private UserProfileProjectStatistics projectStatistics;
    private List<UserReview> reviewList;
}
