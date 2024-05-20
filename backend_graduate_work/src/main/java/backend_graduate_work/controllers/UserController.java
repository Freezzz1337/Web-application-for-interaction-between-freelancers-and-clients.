package backend_graduate_work.controllers;

import backend_graduate_work.DTO.userDTO.UserProfileEditRequestDTO;
import backend_graduate_work.DTO.userDTO.UserProfileEditResponseDTO;
import backend_graduate_work.DTO.userDTO.UserProfileResponseDTO.UserProfileResponseDTO;
import backend_graduate_work.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user")
@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> getUserProfileData() {
            return ResponseEntity.ok(userService.getUserProfileData());
    }

    @PatchMapping("/profile/edit")
    public ResponseEntity<UserProfileEditResponseDTO> userEdit(@RequestBody UserProfileEditRequestDTO profileRequestDTO) {
        userService.userEdit(profileRequestDTO);
        return ResponseEntity.ok(new UserProfileEditResponseDTO());
    }

}
