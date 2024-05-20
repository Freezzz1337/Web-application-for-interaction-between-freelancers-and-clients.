package backend_graduate_work.DTO.userDTO.UserProfileResponseDTO;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileData {
    private String fullName;
    @Lob
    private String bio;
    @Lob
    private byte[] profilePicture;
    private String userType;
}
