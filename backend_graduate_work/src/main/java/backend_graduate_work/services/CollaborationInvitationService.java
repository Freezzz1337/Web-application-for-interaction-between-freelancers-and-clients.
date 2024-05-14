package backend_graduate_work.services;

import backend_graduate_work.DTO.collaborationInvitationDTO.CollaborationInvitationCreateRequestDTO;
import backend_graduate_work.models.*;
import backend_graduate_work.models.enums.StatusProject;
import backend_graduate_work.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
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
        CollaborationInvitation collaborationInvitation = collaborationInvitationRepository.save(CollaborationInvitation.builder()
                .employer(getCurrentUser())
                .freelancer(userRepository.findById(Long.parseLong(createRequestDTO.getFreelancerId())))
                .project(changeProjectForCollaborationInvitation(projectRepository.findById(Long.parseLong(createRequestDTO.getProjectId())),
                        createRequestDTO.getNewBudget(),
                        createRequestDTO.getNewDeadline()))
                .chat(chatRepository.findByProjectIdAndEmployerIdAndFreelancerId(Long.parseLong(createRequestDTO.getProjectId()), getCurrentUser().getId(), Long.parseLong(createRequestDTO.getFreelancerId())))
                .build());


        chatMessageRepository.save(ChatMessage.builder()
                .chat(chatRepository.findById(collaborationInvitation.getChat().getId()))
                .sender(getCurrentUser())
                .messageText(null)
                .collaborationInvitation(collaborationInvitation)
                .build());
    }

    @Transactional
    public Project changeProjectForCollaborationInvitation(Project project, String newBudget, Timestamp newDeadline) {
        project.setBudget(new BigDecimal(newBudget));
        project.setDeadline(newDeadline);
        return project;
    }

    @Transactional
    public void acceptCollaborationInvitation(String invitationId) {
        CollaborationInvitation invitation = collaborationInvitationRepository.findById(Long.parseLong(invitationId));
        invitation.setAccepted(true);

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
        invitation.setDeclined(true);

        collaborationInvitationRepository.save(invitation);
    }


    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
