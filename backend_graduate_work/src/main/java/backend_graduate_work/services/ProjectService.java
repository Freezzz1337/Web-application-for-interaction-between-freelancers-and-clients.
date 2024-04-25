package backend_graduate_work.services;

import backend_graduate_work.DTO.filterDTO.FilterDTO;
import backend_graduate_work.DTO.projectDTO.*;
import backend_graduate_work.models.Project;
import backend_graduate_work.models.enums.StatusProject;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.ProjectRepository;
import backend_graduate_work.repositories.SubprojectTypeRepository;
import backend_graduate_work.util.SearchFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final SubprojectTypeRepository subprojectTypeRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, SubprojectTypeRepository subprojectTypeRepository) {
        this.projectRepository = projectRepository;
        this.subprojectTypeRepository = subprojectTypeRepository;
    }

    public List<ProjectGetAllForEmployerResponseDTO> getAllForEmployer() {
        User currentUser = getCurrentUser();

        return projectRepository.findAllByEmployerId(currentUser.getId())
                .stream()
                .map(project -> ProjectGetAllForEmployerResponseDTO.builder()
                        .id(project.getId())
                        .title(project.getTitle())
                        .status(project.getStatus().toString())
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

    public ProjectDetailsResponseDTO getProjectDetails(long id) {
        Project project = projectRepository.findById(id);

        return ProjectDetailsResponseDTO.builder()
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

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    @Transactional
    public void delete(long id) {
        projectRepository.deleteById(id);
    }

    public List<ProjectGetAllForFreelancerResponseDTO> getAllForFreelancer(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);


        return projectRepository.findAllByStatus(StatusProject.OPEN, pageable).stream()
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
    }


    public List<ProjectGetAllForFreelancerResponseDTO> getFilteredProjectsForFreelancer(FilterDTO filterDTO) {
        List<Project> projects;

//        if (!filterDTO.getSearchString().isEmpty()) {
//            projects = projectRepository.findAllByStatusAndTitleContaining(StatusProject.OPEN, filterDTO.getSearchString());
//        } else {
//            projects = projectRepository.findAllByStatus(StatusProject.OPEN);
//        }
        projects = projectRepository.findAllByStatusAndTitleContaining(StatusProject.OPEN, filterDTO.getSearchString());


        return SearchFilter.filterProjects(projects, filterDTO).stream()
                .map(project -> ProjectGetAllForFreelancerResponseDTO.builder()
                        .id(project.getId())
                        .title(project.getTitle())
                        .budget(project.getBudget())
                        .description(project.getDescription())
                        .deadline(project.getDeadline())
                        .created_at(project.getCreatedAt())
                        .build())
                .toList();
    }
}