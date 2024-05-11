package backend_graduate_work.services;


import backend_graduate_work.DTO.chatDTO.GetChatProjectResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetChatMessage;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetChatResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.Sender;
import backend_graduate_work.DTO.chatDTO.GetChatUserResponseDTO;
import backend_graduate_work.models.Chat;
import backend_graduate_work.models.ChatMessage;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.ChatMessageRepository;
import backend_graduate_work.repositories.ChatRepository;
import backend_graduate_work.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;


    @Autowired
    public ChatService(ChatRepository chatRepository, ChatMessageRepository chatMessageRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
    }

    public List<GetChatProjectResponseDTO> getAllProjectsWithChats() {
        List<Chat> chats = chatRepository.findByEmployerOrFreelancer(getCurrentUser(), getCurrentUser());

        return chats.stream()
                .map(Chat::getProject)
                .distinct()
                .map(project -> GetChatProjectResponseDTO.builder()
                        .projectId(project.getId())
                        .projectName(project.getTitle())
                        .status(String.valueOf(project.getStatus()))
                        .build()).toList();
    }

    public List<GetChatUserResponseDTO> getAllUsersChats(String projectId) {
        List<Chat> chats = chatRepository.findAllByProjectId(Long.parseLong(projectId));

        User currentUser = getCurrentUser();
        long currentUserId = currentUser.getId();
        boolean isCurrentUserFreelancer = currentUser.getUserTypeEnum().getUserType().equals("FREELANCER");

        return chats.stream()
                .filter(chat -> {
                    if (isCurrentUserFreelancer) {
                        return chat.getFreelancer().getId() == currentUserId;
                    } else {
                        return chat.getEmployer().getId() == currentUserId;
                    }
                })
                .map(chat -> {
                    ChatMessage lastMessage = chatMessageRepository.findFirstByChatIdOrderByCreatedAtDesc(chat.getId());
                    return GetChatUserResponseDTO.builder()
                            .fullName(isCurrentUserFreelancer ? chat.getEmployer().getFullName() : chat.getFreelancer().getFullName())
                            .lastMessage(lastMessage != null ? lastMessage.getMessageText() : null)
                            .lastMessageTime(lastMessage != null ? lastMessage.getCreatedAt() : null)
                            .userPicture(isCurrentUserFreelancer ? chat.getEmployer().getProfilePicture() : chat.getFreelancer().getProfilePicture())
                            .userId(isCurrentUserFreelancer ? chat.getEmployer().getId() : chat.getFreelancer().getId())
                            .build();
                })
                .toList();
    }

    public GetChatResponseDTO getChat(long userId, long projectId) {
        User currentUser = getCurrentUser();
        Chat chat;


        if (currentUser.getUserTypeEnum().getUserType().equals("EMPLOYER")) {
            chat = chatRepository.findByProjectIdAndEmployerIdAndFreelancerId(projectId, currentUser.getId(), userId);
        } else {
            chat = chatRepository.findByProjectIdAndEmployerIdAndFreelancerId(projectId, userId, currentUser.getId());
        }
        return GetChatResponseDTO.builder()
                .chatId(chat.getId())
                .chatMessageList(chat.getMessages().stream()
                        .map(message -> GetChatMessage.builder()
                                .messageId(message.getId())
                                .sender(Sender.builder()
                                        .fullName(message.getSender().getFullName())
                                        .profilePicture(message.getSender().getProfilePicture())
                                        .build())
                                .messageText(message.getMessageText())
                                .createdAt(message.getCreatedAt())
                                .build())
                        .toList())
                .build();
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}