package backend_graduate_work.services;

import backend_graduate_work.DTO.collaborationInvitationDTO.CollaborationInvitationCreateRequestDTO;
import backend_graduate_work.DTO.collaborationInvitationDTO.CollaborationInvitationGetRequestDTO;
import backend_graduate_work.DTO.collaborationInvitationDTO.CollaborationInvitationGetResponseDTO;
import backend_graduate_work.models.*;
import backend_graduate_work.models.enums.InvitationStatus;
import backend_graduate_work.models.enums.StatusProject;
import backend_graduate_work.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class CollaborationInvitationService {
    private final CollaborationInvitationRepository collaborationInvitationRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRepository chatRepository;

    @Autowired
    public CollaborationInvitationService(CollaborationInvitationRepository collaborationInvitationRepository, ProjectRepository projectRepository, UserRepository userRepository, ChatMessageRepository chatMessageRepository, ChatRepository chatRepository) {
        this.collaborationInvitationRepository = collaborationInvitationRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.chatRepository = chatRepository;
    }

    @Transactional
    public void create(CollaborationInvitationCreateRequestDTO createRequestDTO) {
        Project project = projectRepository.findById(Long.parseLong(createRequestDTO.getProjectId()));

        CollaborationInvitation collaborationInvitation = collaborationInvitationRepository.save(CollaborationInvitation.builder()
                .employer(getCurrentUser())
                .freelancer(userRepository.findById(Long.parseLong(createRequestDTO.getFreelancerId())))
                .project(project)
                .originalBudget(project.getBudget())
                .originalDeadline(project.getDeadline())
                .newBudget(new BigDecimal(createRequestDTO.getNewBudget()))
                .newDeadline(createRequestDTO.getNewDeadline())
                .status(InvitationStatus.PENDING)
                .chat(chatRepository.findByProjectIdAndEmployerIdAndFreelancerId(Long.parseLong(createRequestDTO.getProjectId()), getCurrentUser().getId(), Long.parseLong(createRequestDTO.getFreelancerId())))
                .build());

        chatMessageRepository.save(ChatMessage.builder()
                .chat(chatRepository.findById(collaborationInvitation.getChat().getId()))
                .sender(getCurrentUser())
                .messageText(collaborationInvitation.getStatus().getStatus())
                .collaborationInvitation(collaborationInvitation)
                .build());
    }


    @Transactional
    public void acceptCollaborationInvitation(String invitationId) {
        CollaborationInvitation invitation = collaborationInvitationRepository.findById(Long.parseLong(invitationId));
        invitation.setStatus(InvitationStatus.ACCEPTED);

        ChatMessage chatMessage = chatMessageRepository.findByCollaborationInvitationId(invitation.getId());
        chatMessage.setMessageText("Accepted");
        chatMessageRepository.save(chatMessage);

        long currentChatId = invitation.getChat().getId();
        List<Chat> chats = chatRepository.findAllByProjectId(invitation.getProject().getId());
        chats.forEach(chat -> chat.setActive(chat.getId() == currentChatId));

        Project project = projectRepository.findById(invitation.getProject().getId());
        project.setStatus(StatusProject.IN_PROGRESS);

        projectRepository.save(project);
        chatRepository.saveAll(chats);
        collaborationInvitationRepository.save(invitation);
    }

    @Transactional
    public void declineCollaborationInvitation(String invitationId) {
        CollaborationInvitation invitation = collaborationInvitationRepository.findById(Long.parseLong(invitationId));
        invitation.setStatus(InvitationStatus.DECLINED);

        collaborationInvitationRepository.save(invitation);
    }

    public CollaborationInvitationGetResponseDTO getCollaboration(long projectId, long userId) {
        List<CollaborationInvitation> collaborationInvitationList = collaborationInvitationRepository.findByFreelancerIdAndEmployerIdAndProjectId(userId, getCurrentUser().getId(), projectId).stream()
                .sorted(Comparator.comparing(CollaborationInvitation::getCreatedAt).reversed())
                .toList();

        CollaborationInvitation latestCollaborationInvitation = collaborationInvitationList.isEmpty() ? null : collaborationInvitationList.get(0);

        return CollaborationInvitationGetResponseDTO.builder()
                .title(latestCollaborationInvitation.getProject().getTitle())
                .projectName(latestCollaborationInvitation.getProject().getTitle())
                .budget(latestCollaborationInvitation.getNewBudget())
                .deadline(latestCollaborationInvitation.getProject().getDeadline())
                .build();
    }

    @Transactional
    public void edit(CollaborationInvitationCreateRequestDTO editRequestDTO) {
        List<CollaborationInvitation> collaborationInvitationList = collaborationInvitationRepository.
                findByFreelancerIdAndEmployerIdAndProjectId(Long.parseLong(editRequestDTO.getFreelancerId()), getCurrentUser().getId(), Long.parseLong(editRequestDTO.getProjectId()));
        collaborationInvitationList.sort(Comparator.comparing(CollaborationInvitation::getCreatedAt));
        CollaborationInvitation latestCollaborationInvitation = collaborationInvitationList.isEmpty() ? null : collaborationInvitationList.get(0);

        CollaborationInvitation updatedCollaborationInvitation = CollaborationInvitation.builder()
                .employer(latestCollaborationInvitation.getEmployer())
                .freelancer(latestCollaborationInvitation.getFreelancer())
                .project(latestCollaborationInvitation.getProject())
                .originalBudget(latestCollaborationInvitation.getOriginalBudget())
                .originalDeadline(latestCollaborationInvitation.getOriginalDeadline())
                .newBudget(new BigDecimal(editRequestDTO.getNewBudget()))
                .newDeadline(editRequestDTO.getNewDeadline())
                .status(InvitationStatus.UPDATED)
                .chat(latestCollaborationInvitation.getChat())
                .build();

        collaborationInvitationRepository.save(updatedCollaborationInvitation);

        chatMessageRepository.save(ChatMessage.builder()
                .chat(chatRepository.findById(latestCollaborationInvitation.getChat().getId()))
                .sender(getCurrentUser())
                .messageText("Updated")
                .collaborationInvitation(updatedCollaborationInvitation)
                .build());
    }


    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

}