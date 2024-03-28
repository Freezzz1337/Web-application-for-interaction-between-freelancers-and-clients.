package backend_graduate_work.services;

import backend_graduate_work.DTO.authDTO.LoginUserDto;
import backend_graduate_work.DTO.authDTO.RegisterUserDto;
import backend_graduate_work.models.User;
import backend_graduate_work.models.UserType;
import backend_graduate_work.repositories.UserRepository;
import backend_graduate_work.util.UserWithThisEmailAlreadyExistsException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final static String DEFAULT_AVATAR = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABmJLR0QA/wD/AP+gvaeTAAAXpUlEQVR42u3d6XMb52HH8d+zOPYCQPC+KYoUKUrUYdeOHduyU+Vok6bNdDrT/pd91c4k4zSybJqypNiWdZAUT/HEwQvnHjifviDFWI5sy5IILIDfZyZvMjZNLvB899ndZ3f927G4BBG1JD83AREDQEQMABExAETEABARA0BEDAARMQBExAAQEQNARAwAETEARMQAEBEDQEQMABExAETEABARA0BEDAARMQBExAAQEQNARAwAETEARMQAEBEDQEQMABExAETEABARA0BEDAARMQBExAAQEQNARAwAETEARMQAEDEARMQAEBEDQEQMABExAETEABARA0BEDAARMQBExAAQEQNARAwAETEARMQAUP1JKQEAQgjomgahCMiqhJQSlWoVslqFUAQURYEQAopQICFRdVwUjv99IQQ3JANAnh/sAAQAXddQKVdwmM7Asiy4hQJct4BMoYBiPo9ypXIUBvmdHyAE/D4FgUAIbZEgVFWFpqowdB2dHe1Qg0HYjsMoMADkpT28rmsQABK7+0ilM9jNZWGl0lAUBbqmPfPPB4NBBH/0p5aQy5eQy1sn/w3bdqCqKnp7uhA2Q+jt6YKmabBtmzFgAKgeVDWIre049g72sbu3D59hQDsejKZhvLb/jhACpnn08w4OU9g/OMTc4iJMXcfQ4ACGBwcQDFRhO1XGgAGg0xYJh7Cyto5HC4swTeN4gJo1++8LIU4Csx2LY2FpGUMDA5g+P4FAIADHdfkhMQD0ugWDQcx8cQd5y0I4FEIoZHri9wqHQshks7gxMwsJiWvvvgPT9MN1JT80BoBela6pWFxZw9rGJgxdRzgU8uTvqR2fb/jsi7sYGujD+NlRKDwkYADoZUiETBOPV1axtr4JNRiEoesN8Zubho5UOoObM7dwZngQE2NjqMoqP1IGgF5sT6oiFk9i9s6XCAQC0FS1If+OUMjEQSqNzZnPMTk+homxUViOC84JGAB63j5fSmiaigdzC4gnd//uEl6jMg0D27E4YvEk3nnrjZPFScQA0MmEHwiZJv588zP4/f6mGfxPCSEgIXFj5nP84v33oSicBzAA9Mze/8bMLHw+X1P/naZh4ubntzB5bgwT42fhOLxkyAC0MF3TsPJk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";

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        if (userRepository.findByEmail(input.getEmail()).isEmpty()) {
            User user = new User();
            Timestamp currentTime = new Timestamp(System.currentTimeMillis());

            user.setFullName(input.getFullName());
            user.setEmail(input.getEmail());
            user.setPassword(passwordEncoder.encode(input.getPassword()));
            user.setBio(input.getBio());
            user.setUsername(input.getUsername());

// TODO: 3/28/2024  toUpperCase() - may be worth deleting this method below
            user.setUserType(UserType.valueOf(input.getUserType().toUpperCase()));

            if (input.getProfilePicture() != null) {
                user.setProfilePicture(convertToByteArray(input.getProfilePicture()));
            } else {
                user.setProfilePicture(convertToByteArray(DEFAULT_AVATAR));
            }

            user.setCreatedAt(currentTime);
            user.setUpdatedAt(currentTime);

            return userRepository.save(user);
        } else {
            throw new UserWithThisEmailAlreadyExistsException();
        }
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }

    private byte[] convertToByteArray(String base64) {
        base64 = base64.replace("data:image/jpeg;base64,", "");
        return Base64.getDecoder().decode(base64);
    }
}
