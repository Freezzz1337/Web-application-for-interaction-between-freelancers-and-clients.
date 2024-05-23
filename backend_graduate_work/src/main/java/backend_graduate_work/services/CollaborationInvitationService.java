package backend_graduate_work.services;

import backend_graduate_work.DTO.collaborationInvitationDTO.checkDeadlinDTO.CheckDeadline;
import backend_graduate_work.DTO.collaborationInvitationDTO.checkDeadlinDTO.CheckDeadlineDTO;
import backend_graduate_work.DTO.collaborationInvitationDTO.collaborationInvitationCompletedRequestDTO.CollaborationInvitationCompletedRequestDTO;
import backend_graduate_work.DTO.collaborationInvitationDTO.CollaborationInvitationCreateRequestDTO;
import backend_graduate_work.DTO.collaborationInvitationDTO.CollaborationInvitationGetResponseDTO;
import backend_graduate_work.models.*;
import backend_graduate_work.models.enums.InvitationStatus;
import backend_graduate_work.models.enums.StatusProject;
import backend_graduate_work.models.enums.UserTypeEnum;
import backend_graduate_work.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class CollaborationInvitationService {
    private final CollaborationInvitationRepository collaborationInvitationRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRepository chatRepository;
    private final ReviewService reviewService;

    @Autowired
    public CollaborationInvitationService(CollaborationInvitationRepository collaborationInvitationRepository, ProjectRepository projectRepository, UserRepository userRepository, ChatMessageRepository chatMessageRepository, ChatRepository chatRepository, ReviewService reviewService) {
        this.collaborationInvitationRepository = collaborationInvitationRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.chatRepository = chatRepository;
        this.reviewService = reviewService;
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
        project.setFreelancer(invitation.getFreelancer());
        project.setStatus(StatusProject.IN_PROGRESS);

        projectRepository.save(project);
        chatRepository.saveAll(chats);
        collaborationInvitationRepository.save(invitation);
    }

    @Transactional
    public void declineInvitation(String id) {
        CollaborationInvitation collaborationInvitation = collaborationInvitationRepository.findById(Long.parseLong(id));
        collaborationInvitation.setStatus(InvitationStatus.DECLINED);

        collaborationInvitationRepository.save(collaborationInvitation);
    }

    @Transactional
    public void declineCollaborationInvitation(CollaborationInvitationCreateRequestDTO requestDTO) {
        CollaborationInvitation latestCollaborationInvitation = getLatestInvitation(collaborationInvitationRepository.findByFreelancerIdAndEmployerIdAndProjectId(Long.parseLong(requestDTO.getFreelancerId()), getCurrentUser().getId(), Long.parseLong(requestDTO.getProjectId())));
        CollaborationInvitation newCollaborationInvitation = CollaborationInvitation.builder()
                .employer(latestCollaborationInvitation.getEmployer())
                .freelancer(latestCollaborationInvitation.getFreelancer())
                .project(latestCollaborationInvitation.getProject())
                .originalBudget(latestCollaborationInvitation.getOriginalBudget())
                .originalDeadline(latestCollaborationInvitation.getOriginalDeadline())
                .newBudget(latestCollaborationInvitation.getNewBudget())
                .newDeadline(latestCollaborationInvitation.getNewDeadline())
                .status(InvitationStatus.DECLINED)
                .chat(latestCollaborationInvitation.getChat())
                .build();

        List<Chat> chats = chatRepository.findAllByProjectId(latestCollaborationInvitation.getProject().getId());
        chats.forEach(chat -> chat.setActive(true));

        Project project = projectRepository.findById(latestCollaborationInvitation.getProject().getId());
        project.setFreelancer(null);
        project.setStatus(StatusProject.OPEN);

        chatMessageRepository.save(ChatMessage.builder()
                .chat(chatRepository.findById(latestCollaborationInvitation.getChat().getId()))
                .sender(getCurrentUser())
                .messageText("Declined")
                .collaborationInvitation(newCollaborationInvitation)
                .build());

        projectRepository.save(project);
        chatRepository.saveAll(chats);
        collaborationInvitationRepository.save(newCollaborationInvitation);
    }

    public CollaborationInvitationGetResponseDTO getCollaboration(long projectId, long userId) {
        List<CollaborationInvitation> collaborationInvitationList = collaborationInvitationRepository.findByFreelancerIdAndEmployerIdAndProjectId(userId, getCurrentUser().getId(), projectId);

        if (collaborationInvitationList.isEmpty()) {
            Project project = projectRepository.findById(projectId);

            return CollaborationInvitationGetResponseDTO.builder()
                    .title(project.getTitle())
                    .budget(project.getBudget())
                    .deadline(project.getDeadline())
                    .build();
        } else {
            collaborationInvitationList = collaborationInvitationList.stream()
                    .sorted(Comparator.comparing(CollaborationInvitation::getCreatedAt).reversed())
                    .toList();


            CollaborationInvitation latestCollaborationInvitation = collaborationInvitationList.isEmpty() ? null : collaborationInvitationList.get(0);

            return CollaborationInvitationGetResponseDTO.builder()
                    .title(latestCollaborationInvitation.getProject().getTitle())
                    .budget(latestCollaborationInvitation.getNewBudget())
                    .deadline(latestCollaborationInvitation.getProject().getDeadline())
                    .build();
        }
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


    @Transactional
    public void completedCollaborationInvitation(CollaborationInvitationCompletedRequestDTO requestDTO) {
        CollaborationInvitation latestCollaborationInvitation = getLatestInvitation(collaborationInvitationRepository.findByFreelancerIdAndEmployerIdAndProjectId(Long.parseLong(requestDTO.getFreelancerId()), getCurrentUser().getId(), Long.parseLong(requestDTO.getProjectId())));

        CollaborationInvitation completedCollaborationInvitation = CollaborationInvitation.builder()
                .employer(latestCollaborationInvitation.getEmployer())
                .freelancer(latestCollaborationInvitation.getFreelancer())
                .project(latestCollaborationInvitation.getProject())
                .originalBudget(latestCollaborationInvitation.getOriginalBudget())
                .originalDeadline(latestCollaborationInvitation.getOriginalDeadline())
                .newBudget(latestCollaborationInvitation.getNewBudget())
                .newDeadline(latestCollaborationInvitation.getNewDeadline())
                .status(InvitationStatus.COMPLETED)
                .chat(latestCollaborationInvitation.getChat())
                .build();

        collaborationInvitationRepository.save(completedCollaborationInvitation);


        chatMessageRepository.save(ChatMessage.builder()
                .chat(chatRepository.findById(latestCollaborationInvitation.getChat().getId()))
                .sender(getCurrentUser())
                .messageText("Completed")
                .collaborationInvitation(completedCollaborationInvitation)
                .build());

        Project project = projectRepository.findById(latestCollaborationInvitation.getProject().getId());
        project.setStatus(StatusProject.COMPLETED);

        reviewService.save(requestDTO.getFreelancerId(), getCurrentUser(), requestDTO.getProjectId(), requestDTO.getReview().getComment(), requestDTO.getReview().getRating());
        projectRepository.save(project);
        collaborationInvitationRepository.save(completedCollaborationInvitation);
    }

    private CollaborationInvitation getLatestInvitation(List<CollaborationInvitation> list) {
        return list.stream()
                .sorted(Comparator.comparing(CollaborationInvitation::getCreatedAt).reversed())
                .toList()
                .get(0);
    }

    public CheckDeadlineDTO checkDeadline() {
        User currentUser = getCurrentUser();
        List<CollaborationInvitation> invitationList;

        if (currentUser.getUserTypeEnum().equals(UserTypeEnum.EMPLOYER)) {
            invitationList = collaborationInvitationRepository.findByEmployerId(currentUser.getId());
        } else {
            invitationList = collaborationInvitationRepository.findByFreelancerId(currentUser.getId());
        }

        Map<Long, Optional<CollaborationInvitation>> latestInvitationsByProjectId = invitationList.stream()
                .collect(Collectors.groupingBy(
                        invitation -> invitation.getProject().getId(),
                        Collectors.maxBy(Comparator.comparing(CollaborationInvitation::getCreatedAt))
                ));

        List<CheckDeadline> checkDeadlines = latestInvitationsByProjectId.values().stream()
                .filter(Optional::isPresent)
                .map(Optional::get)
                .filter(invitation -> !Arrays.asList(InvitationStatus.PENDING, InvitationStatus.DECLINED, InvitationStatus.COMPLETED).contains(invitation.getStatus()))
                .map(invitation -> CheckDeadline.builder()
                        .deadline(invitation.getNewDeadline())
                        .projectName(invitation.getProject().getTitle())
                        .build())
                .toList();


        return CheckDeadlineDTO.builder()
                .checkDeadlines(checkDeadlines)
                .build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}