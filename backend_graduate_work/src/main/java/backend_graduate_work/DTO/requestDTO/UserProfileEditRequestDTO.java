package backend_graduate_work.DTO.requestDTO;

import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class UserProfileEditRequestDTO {
    private String fullName;
    @Lob
    private String bio;
    @Lob
    private byte[] profilePicture;
}
