package backend_graduate_work.services;

import backend_graduate_work.DTO.filterDTO.FilterDTO;
import backend_graduate_work.DTO.filterDTO.ProjectPagesDTO;
import backend_graduate_work.DTO.projectCommentDTO.ProjectCommentGetAllForProjectDetails;
import backend_graduate_work.DTO.projectDTO.*;
import backend_graduate_work.DTO.projectDTO.ProjectDetailsForEmployerResponseDTO.ProjectDetailsForEmployer;
import backend_graduate_work.DTO.projectDTO.ProjectDetailsForEmployerResponseDTO.ProjectDetailsForEmployerResponseDTO;
import backend_graduate_work.DTO.projectDTO.ProjectGetAllForEmployerResponseDTO;
import backend_graduate_work.models.ChatMessage;
import backend_graduate_work.models.Project;
import backend_graduate_work.models.enums.StatusProject;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.*;
import backend_graduate_work.util.SearchFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final SubprojectTypeRepository subprojectTypeRepository;
    private final ProjectCommentRepository projectCommentRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRepository chatRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, SubprojectTypeRepository subprojectTypeRepository, ProjectCommentRepository projectCommentRepository, ChatMessageRepository chatMessageRepository, ChatRepository chatRepository) {
        this.projectRepository = projectRepository;
        this.subprojectTypeRepository = subprojectTypeRepository;
        this.projectCommentRepository = projectCommentRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.chatRepository = chatRepository;
    }

    public List<ProjectGetAllForEmployerResponseDTO> getAllForEmployer() {
        User currentUser = getCurrentUser();

        return projectRepository.findAllByEmployerId(currentUser.getId())
                .stream()
                .map(project -> ProjectGetAllForEmployerResponseDTO.builder()
                        .id(project.getId())
                        .title(project.getTitle())
                        .status(project.getStatus().toString())
                        .amountOfComments(projectCommentRepository.findAllByProjectId(project.getId()).get().size())
                        .build()
                )
                .toList();
    }

    @Transactional
    public void create(ProjectCreateRequestDTO projectCreateRequestDTO) {
        User currentUser = getCurrentUser();
        Project newProject = new Project();

        newProject.setTitle(projectCreateRequestDTO.getTitle());
        newProject.setDescription(projectCreateRequestDTO.getDescription());
        newProject.setBudget(projectCreateRequestDTO.getBudget());
        newProject.setDeadline(projectCreateRequestDTO.getDeadline());
        newProject.setSubprojectType(subprojectTypeRepository.findById(Long.parseLong(projectCreateRequestDTO.getSubprojectType())));

        newProject.setEmployer(currentUser);

        projectRepository.save(newProject);
    }

    public ProjectDetailsForEmployerResponseDTO getProjectForEmployerDetails(long id) {
        Project project = projectRepository.findById(id);
        ProjectDetailsForEmployer projectDetailsForEmployer = ProjectDetailsForEmployer.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .budget(project.getBudget())
                .deadline(project.getDeadline())
                .freelancer(project.getFreelancer())
                .status(project.getStatus().toString())
                .projectType(project.getSubprojectType().getProjectType())
                .subprojectType(project.getSubprojectType())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();

        List<ProjectCommentGetAllForProjectDetails> projectCommentGetAllForProjectDetails =
                projectCommentRepository.findAllByProjectId(id)
                        .orElse(Collections.emptyList())
                        .stream()
                        .map(projectComment -> ProjectCommentGetAllForProjectDetails.builder()
                                .commentText(projectComment.getCommentText())
                                .budget(projectComment.getBudget())
                                .createdAt(projectComment.getCreatedAt())
                                .userName(projectComment.getUser().getFullName())
                                .userId(projectComment.getUser().getId())
                                .firstMessage(chatRepository.existsByEmployerIdAndFreelancerIdAndProjectId(getCurrentUser().getId(), projectComment.getUser().getId(), projectComment.getProject().getId()))
                                .profilePicture(projectComment.getUser().getProfilePicture())
                                .build())
                        .toList();

        return new ProjectDetailsForEmployerResponseDTO(projectDetailsForEmployer, projectCommentGetAllForProjectDetails);
    }

    public ProjectDetailsForFreelancerResponseDTO getProjectDetailsForFreelancer(long id) {
        Project project = projectRepository.findById(id);

        ProjectDetailsForFreelancer projectDetailsForFreelancer = ProjectDetailsForFreelancer.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .budget(project.getBudget())
                .deadline(project.getDeadline())
                .status(project.getStatus().toString())
                .projectType(project.getSubprojectType().getProjectType())
                .subprojectType(project.getSubprojectType())
                .createdAt(project.getCreatedAt())
                .build();

        List<ProjectCommentGetAllForProjectDetails> projectCommentGetAllForProjectDetails =
                projectCommentRepository.findAllByProjectId(id)
                        .orElse(Collections.emptyList())
                        .stream()
                        .map(projectComment -> ProjectCommentGetAllForProjectDetails.builder()
                                .commentText(projectComment.getCommentText())
                                .budget(projectComment.getBudget())
                                .createdAt(projectComment.getCreatedAt())
                                .userName(projectComment.getUser().getFullName())
                                .profilePicture(projectComment.getUser().getProfilePicture())
                                .build())
                        .toList();

        return new ProjectDetailsForFreelancerResponseDTO(projectDetailsForFreelancer, projectCommentGetAllForProjectDetails);
    }

    @Transactional
    public void editProject(ProjectEditRequestDTO editRequestDTO) {
        Project project = projectRepository.findById(editRequestDTO.getId());

        project.setTitle(editRequestDTO.getTitle());
        project.setDescription(editRequestDTO.getDescription());
        project.setBudget(editRequestDTO.getBudget());
        project.setDeadline(editRequestDTO.getDeadline());
        project.setFreelancer(editRequestDTO.getFreelancer());
        project.setSubprojectType(editRequestDTO.getSubprojectType());
        project.getSubprojectType().setProjectType(editRequestDTO.getProjectType());
        if (editRequestDTO.getStatus() != null && !editRequestDTO.getStatus().isEmpty())
            project.setStatus(StatusProject.valueOf(editRequestDTO.getStatus()));
        project.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        projectRepository.save(project);
    }

    @Transactional
    public void delete(long id) {
        projectRepository.deleteById(id);
    }

    public ProjectPagesDTO getAllForFreelancer(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        List<Project> list = projectRepository.findAllByStatus(StatusProject.OPEN);
        int numberOfProjects = list.size();

        List<ProjectGetAllForFreelancerResponseDTO> projects = projectRepository.findAllByStatusOrderByCreatedAtDesc(StatusProject.OPEN, pageable).stream()
                .sorted(Comparator.comparing(Project::getCreatedAt).reversed())
                .map(project -> ProjectGetAllForFreelancerResponseDTO.builder()
                        .id(project.getId())
                        .title(project.getTitle())
                        .budget(project.getBudget())
                        .description(project.getDescription())
                        .deadline(project.getDeadline())
                        .created_at(project.getCreatedAt())
                        .build())
                .toList();

        return new ProjectPagesDTO(projects, numberOfProjects);
    }


    public ProjectPagesDTO getFilteredProjectsForFreelancer(FilterDTO filterDTO, int page, int size) {
        List<Project> projects;

        if (!filterDTO.getSearchString().isEmpty()) {
            projects = projectRepository.findAllByStatusAndTitleContaining(StatusProject.OPEN, filterDTO.getSearchString());
        } else {
            projects = projectRepository.findAllByStatus(StatusProject.OPEN);
        }

        List<ProjectGetAllForFreelancerResponseDTO> responseDTOList = SearchFilter.filterProjects(projects, filterDTO).stream()
                .map(project -> ProjectGetAllForFreelancerResponseDTO.builder()
                        .id(project.getId())
                        .title(project.getTitle())
                        .budget(project.getBudget())
                        .description(project.getDescription())
                        .deadline(project.getDeadline())
                        .created_at(project.getCreatedAt())
                        .build())
                .toList();

        int totalProjects = responseDTOList.size();

        int startIndex = Math.max((page - 1) * size, 0);
        int endIndex = Math.min(startIndex + size, totalProjects);

        List<ProjectGetAllForFreelancerResponseDTO> pageResponseDTOList = responseDTOList.subList(startIndex, endIndex);

        return new ProjectPagesDTO(pageResponseDTOList, totalProjects);
    }


    public ProjectGetFroCollaborationInvitationResponseDTO getProjectForCollaborationInvitation(String projectId) {
        Project project = projectRepository.findById(Long.parseLong(projectId));
        return ProjectGetFroCollaborationInvitationResponseDTO.builder()
                .title(project.getTitle())
                .budget(project.getBudget())
                .deadline(project.getDeadline())
                .build();
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}