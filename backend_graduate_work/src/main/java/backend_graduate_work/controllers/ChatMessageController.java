package backend_graduate_work.controllers;

import backend_graduate_work.DTO.chatDTO.ChatResponseFromEmployerToCommentRequestDTO;
import backend_graduate_work.DTO.chatDTO.ChatResponseFromEmployerToCommentResponseDTO;
import backend_graduate_work.DTO.userDTO.UserProfileEditRequestDTO;
import backend_graduate_work.DTO.userDTO.UserProfileEditResponseDTO;
import backend_graduate_work.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    @Autowired
    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @PostMapping("/firstMessage")
    public ResponseEntity<ChatResponseFromEmployerToCommentResponseDTO> userEdit(@RequestBody ChatResponseFromEmployerToCommentRequestDTO chatDTO) {
        chatMessageService.chatResponseFromEmployerToComment(chatDTO);
        return ResponseEntity.ok(new ChatResponseFromEmployerToCommentResponseDTO());
    }
}
