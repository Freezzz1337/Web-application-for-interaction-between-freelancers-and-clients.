package backend_graduate_work.services;

import backend_graduate_work.DTO.userDTO.UserProfileEditRequestDTO;
import backend_graduate_work.DTO.userDTO.UserProfileResponseDTO;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileResponseDTO getUserProfileData() {
        User currentUser = getCurrentUser();
        return UserProfileResponseDTO.builder()
                .fullName(currentUser.getFullName())
                .bio(currentUser.getBio())
                .userType(String.valueOf(currentUser.getUserTypeEnum()))
                .profilePicture(currentUser.getProfilePicture())
                .build();
    }

    @Transactional
    public void userEdit(UserProfileEditRequestDTO profileRequestDTO) {
        User currentUser = getCurrentUser();

        currentUser.setFullName(profileRequestDTO.getFullName());
        currentUser.setBio(profileRequestDTO.getBio());
        currentUser.setProfilePicture(profileRequestDTO.getProfilePicture());
        currentUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(currentUser);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
