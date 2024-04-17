package backend_graduate_work.DTO.userDTO;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
public class UserProfileResponseDTO {
    private String fullName;
    @Lob
    private String bio;
    @Lob
    private byte[] profilePicture;
    private String userType;
}
