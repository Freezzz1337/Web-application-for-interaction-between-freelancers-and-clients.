package backend_graduate_work.controllers;

import backend_graduate_work.DTO.requestDTO.UserProfileEditRequestDTO;
import backend_graduate_work.DTO.responseDTO.UserProfileEditResponseDTO;
import backend_graduate_work.DTO.responseDTO.UserProfileResponseDTO;
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

    @PostMapping("/profile/edit")
    public ResponseEntity<UserProfileEditResponseDTO> userEdit(@RequestBody UserProfileEditRequestDTO profileRequestDTO) {
        userService.userEdit(profileRequestDTO);
        return ResponseEntity.ok(new UserProfileEditResponseDTO());
    }

}
