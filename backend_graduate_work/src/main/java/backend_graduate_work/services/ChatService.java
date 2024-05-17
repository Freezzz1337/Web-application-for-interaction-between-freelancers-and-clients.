package backend_graduate_work.services;

import backend_graduate_work.DTO.chatDTO.GetChatProjectResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetChatMessage;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetChatResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetCollaborationInvitation;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.Sender;
import backend_graduate_work.DTO.chatDTO.GetChatUserResponseDTO;
import backend_graduate_work.models.*;
import backend_graduate_work.models.enums.InvitationStatus;
import backend_graduate_work.models.enums.UserTypeEnum;
import backend_graduate_work.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ProjectRepository projectRepository;
    private final CollaborationInvitationRepository collaborationInvitationRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository, ChatMessageRepository chatMessageRepository, ProjectRepository projectRepository, CollaborationInvitationRepository collaborationInvitationRepository) {
        this.chatRepository = chatRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.projectRepository = projectRepository;
        this.collaborationInvitationRepository = collaborationInvitationRepository;
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
        boolean isCurrentUserFreelancer = currentUser.getUserTypeEnum().getUserType().equals(UserTypeEnum.FREELANCER.getUserType());

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
                            .lastMessage(
                                    lastMessage.getMessageText() != null ? lastMessage.getMessageText() :
                                            (lastMessage.getFileName() != null ? lastMessage.getFileName() : "Collaboration Invitation")
                            )
                            .lastMessageTime(lastMessage != null ? lastMessage.getCreatedAt() : null)
                            .userPicture(isCurrentUserFreelancer ? chat.getEmployer().getProfilePicture() : chat.getFreelancer().getProfilePicture())
                            .userId(isCurrentUserFreelancer ? chat.getEmployer().getId() : chat.getFreelancer().getId())
                            .active(chat.isActive())
                            .build();
                })
                .toList();
    }

    private boolean collaborationIsActive(List<CollaborationInvitation> list) {
        list.sort(Comparator.comparing(CollaborationInvitation::getCreatedAt).reversed());

        for (CollaborationInvitation c : list) {
            if (c.getStatus().getStatus().equals("ACCEPTED")) {
                return true;
            }
            if (c.getStatus().getStatus().equals("DECLINED")) {
                return false;
            }
        }
        return false;
    }

    public GetChatResponseDTO getChat(long userId, long projectId) {
        User currentUser = getCurrentUser();
        Chat chat;
        boolean collaborationIsActive = false;

        if (currentUser.getUserTypeEnum().getUserType().equals(UserTypeEnum.EMPLOYER.getUserType())) {
            chat = chatRepository.findByProjectIdAndEmployerIdAndFreelancerId(projectId, currentUser.getId(), userId);

            collaborationIsActive = collaborationIsActive(collaborationInvitationRepository.findByFreelancerIdAndEmployerId(userId, currentUser.getId()));
        } else {
            chat = chatRepository.findByProjectIdAndEmployerIdAndFreelancerId(projectId, userId, currentUser.getId());
        }

        return GetChatResponseDTO.builder()
                .chatId(chat.getId())
                .collaborationIsActive(collaborationIsActive)
                .chatMessageList(chat.getMessages().stream()
                        .map(message -> GetChatMessage.builder()
                                .messageId(message.getId())
                                .sender(Sender.builder()
                                        .senderId(message.getSender().getId())
                                        .fullName(message.getSender().getFullName())
                                        .profilePicture(message.getSender().getProfilePicture())
                                        .build())
                                .messageText(message.getCollaborationInvitation() == null ? message.getMessageText() : null)
                                .fileName(message.getFileName())
                                .file(message.getFileData())
                                .createdAt(message.getCreatedAt())
                                .collaborationInvitation(message.getCollaborationInvitation() != null ?
                                        getCollaborationInvitation(message.getCollaborationInvitation()) : null)
                                .build())
                        .toList())
                .build();
    }

    private GetCollaborationInvitation getCollaborationInvitation(CollaborationInvitation collaborationInvitation) {
        return GetCollaborationInvitation.builder()
                .id(collaborationInvitation.getId())
                .budget(collaborationInvitation.getNewBudget())
                .projectName(collaborationInvitation.getProject().getTitle())
                .status(collaborationInvitation.getStatus().getStatus())
                .createdAt(collaborationInvitation.getCreatedAt())
                .build();
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}