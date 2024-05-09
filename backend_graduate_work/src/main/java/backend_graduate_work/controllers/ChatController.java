package backend_graduate_work.controllers;

import backend_graduate_work.DTO.chatDTO.GetChatProjectResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetChatResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatUserResponseDTO;
import backend_graduate_work.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/getAllProjectsWithChats")
    public ResponseEntity<List<GetChatProjectResponseDTO>> getAllProjectsWithChats() {
        return ResponseEntity.ok(chatService.getAllProjectsWithChats());
    }

    @GetMapping("/getAllUserChats/{projectId}")
    public ResponseEntity<List<GetChatUserResponseDTO>> getAllUsersChats(@PathVariable String projectId) {
        return ResponseEntity.ok(chatService.getAllUsersChats(projectId));
    }

    @GetMapping("/getChat")
    public ResponseEntity<GetChatResponseDTO> getChat(@RequestParam long userId,
                                                      @RequestParam long projectId) {
        return ResponseEntity.ok(chatService.getChat(userId, projectId));
    }
}