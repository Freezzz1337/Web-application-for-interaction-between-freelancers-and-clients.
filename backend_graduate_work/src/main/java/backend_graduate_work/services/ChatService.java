package backend_graduate_work.services;

import backend_graduate_work.DTO.chatDTO.GetChatProjectResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetChatMessage;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetChatResponseDTO;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.GetCollaborationInvitation;
import backend_graduate_work.DTO.chatDTO.GetChatResponseDTO.Sender;
import backend_graduate_work.DTO.chatDTO.GetChatUserResponseDTO;
import backend_graduate_work.models.*;
import backend_graduate_work.repositories.*;
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

    public GetChatResponseDTO getChat(long userId, long projectId) {
        User currentUser = getCurrentUser();
        Chat chat;
        boolean collaborationIsActive = false;

        Project project = projectRepository.findById(projectId);


        if (currentUser.getUserTypeEnum().getUserType().equals("EMPLOYER")) {
            chat = chatRepository.findByProjectIdAndEmployerIdAndFreelancerId(projectId, currentUser.getId(), userId);

            collaborationIsActive = collaborationInvitationRepository.findByFreelancerIdAndEmployerIdAndAcceptedIsTrue(userId, currentUser.getId()) != null;
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
                                .messageText(message.getMessageText())
                                .fileName(message.getFileName())
                                .file(message.getFileData())
                                .createdAt(message.getCreatedAt())
                                .collaborationInvitation(message.getCollaborationInvitation() != null ?
                                        getCollaborationInvitation(message.getCollaborationInvitation().getId(), project) : null)
                                .build())
                        .toList())
                .build();
    }

    private GetCollaborationInvitation getCollaborationInvitation(long collaborationInvitationId, Project project) {
        CollaborationInvitation invitation = collaborationInvitationRepository.findById(collaborationInvitationId);

        return GetCollaborationInvitation.builder()
                .id(invitation.getId())
                .budget(project.getBudget())
                .projectName(project.getTitle())
                .accepted(invitation.isAccepted())
                .declined(invitation.isDeclined())
                .createdAt(invitation.getCreatedAt())
                .build();
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}