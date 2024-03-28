package backend_graduate_work.DTO.authDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {

    private String username;

    private String email;

    private String password;

    private String fullName;

    private String bio;

    private String userType;

    private String profilePicture;
}
