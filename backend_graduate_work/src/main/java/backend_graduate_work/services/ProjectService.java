package backend_graduate_work.services;

import backend_graduate_work.DTO.requestDTO.ProjectCreateRequestDTO;
import backend_graduate_work.models.Project;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public void create(ProjectCreateRequestDTO projectCreateRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Project newProject = new Project();

        newProject.setTitle(projectCreateRequestDTO.getTitle());
        newProject.setDescription(projectCreateRequestDTO.getDescription());
        newProject.setBudget(projectCreateRequestDTO.getBudget());
        newProject.setDeadline(projectCreateRequestDTO.getDeadline());

        newProject.setEmployer(currentUser);

        projectRepository.save(newProject);
    }
}