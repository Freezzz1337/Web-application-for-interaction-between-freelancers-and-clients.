package backend_graduate_work.services;

import backend_graduate_work.DTO.requestDTO.UserProfileEditRequestDTO;
import backend_graduate_work.DTO.responseDTO.UserProfileResponseDTO;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        UserProfileResponseDTO userProfileResponseDTO = new UserProfileResponseDTO();

//        userProfileResponseDTO.setUsername(currentUser.getUsername());
        userProfileResponseDTO.setFullName(currentUser.getFullName());
        userProfileResponseDTO.setBio(currentUser.getBio());
        userProfileResponseDTO.setUserType(String.valueOf(currentUser.getUserTypeEnum()));
        userProfileResponseDTO.setProfilePicture(currentUser.getProfilePicture());

        return userProfileResponseDTO;
    }

    @Transactional
    public void userEdit(UserProfileEditRequestDTO profileRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        currentUser.setFullName(profileRequestDTO.getFullName());
        currentUser.setBio(profileRequestDTO.getBio());
        currentUser.setProfilePicture(profileRequestDTO.getProfilePicture());
        currentUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(currentUser);
    }

}
