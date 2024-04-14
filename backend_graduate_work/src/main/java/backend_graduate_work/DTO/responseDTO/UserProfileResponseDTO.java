package backend_graduate_work.DTO.responseDTO;

import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileResponseDTO {
//    private String username;
    private String fullName;
    @Lob
    private String bio;
    @Lob
    private byte[] profilePicture;
    private String userType;
}
