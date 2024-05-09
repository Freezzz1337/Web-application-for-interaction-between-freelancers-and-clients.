package backend_graduate_work.services;

import backend_graduate_work.DTO.chatMessageDTO.ChatResponseFromEmployerToCommentRequestDTO;
import backend_graduate_work.models.Chat;
import backend_graduate_work.models.ChatMessage;
import backend_graduate_work.models.Project;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.ChatMessageRepository;
import backend_graduate_work.repositories.ChatRepository;
import backend_graduate_work.repositories.ProjectRepository;
import backend_graduate_work.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional(readOnly = true)
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository, ProjectRepository projectRepository, UserRepository userRepository, ChatRepository chatRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }

    // TODO: 5/8/2024 method needs a reactor!!!!!!!!!
    @Transactional
    public void chatResponseFromEmployerToComment(ChatResponseFromEmployerToCommentRequestDTO chatDTO) {
        User employer = getCurrentUser();
        User freelancer = userRepository.findById(chatDTO.getFreelancerId());
        Project project = projectRepository.findById(chatDTO.getProjectId());

        Chat chat = new Chat();
        chat.setProject(project);
        chat.setEmployer(employer);
        chat.setFreelancer(freelancer);
        chat.setActive(true);

        chatRepository.save(chat);

        ChatMessage message = new ChatMessage();
        message.setChat(chat);
        message.setSender(employer); 
        message.setMessageText(chatDTO.getMessage());
        if (chat.getMessages() == null) {
            chat.setMessages(new ArrayList<>());
        }
        chat.getMessages().add(message);

        chatRepository.save(chat);

    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}