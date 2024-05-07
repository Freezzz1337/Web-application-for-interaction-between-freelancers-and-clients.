package backend_graduate_work.services;

import backend_graduate_work.DTO.chatDTO.ChatResponseFromEmployerToCommentRequestDTO;
import backend_graduate_work.models.ChatMessage;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.ChatMessageRepository;
import backend_graduate_work.repositories.ProjectRepository;
import backend_graduate_work.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void chatResponseFromEmployerToComment(ChatResponseFromEmployerToCommentRequestDTO chatDTO) {
        chatMessageRepository.save(ChatMessage.builder()
                .project(projectRepository.findById(chatDTO.getProjectId()))
                .sender(getCurrentUser())
                .receiver(userRepository.findById(chatDTO.getFreelancerId()))
                .messageText(chatDTO.getMessage())
                .build());
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
