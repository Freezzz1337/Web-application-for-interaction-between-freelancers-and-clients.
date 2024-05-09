package backend_graduate_work.controllers;

import backend_graduate_work.DTO.chatMessageDTO.ChatResponseFromEmployerToCommentRequestDTO;
import backend_graduate_work.DTO.chatMessageDTO.ChatResponseFromEmployerToCommentResponseDTO;
import backend_graduate_work.services.ChatMessageService;
import backend_graduate_work.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatMessage")
public class ChatMessageController {
    private final ChatMessageService chatMessageService;
    private final ChatService chatService;
    @Autowired
    public ChatMessageController(ChatMessageService chatMessageService, ChatService chatService) {
        this.chatMessageService = chatMessageService;
        this.chatService = chatService;
    }

    @PostMapping("/firstMessage")
    public ResponseEntity<ChatResponseFromEmployerToCommentResponseDTO> userEdit(@RequestBody ChatResponseFromEmployerToCommentRequestDTO chatDTO) {
        chatMessageService.chatResponseFromEmployerToComment(chatDTO);
        return ResponseEntity.ok(new ChatResponseFromEmployerToCommentResponseDTO());
    }


}
