package backend_graduate_work.services;

import backend_graduate_work.DTO.projectCommentDTO.ProjectCommentCreateRequestDTO;
import backend_graduate_work.models.ProjectComment;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.ProjectCommentRepository;
import backend_graduate_work.repositories.ProjectRepository;
import backend_graduate_work.util.ProjectCommentAlreadyLeftException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ProjectCommentService {

    private final ProjectCommentRepository projectCommentRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectCommentService(ProjectCommentRepository projectCommentRepository, ProjectRepository projectRepository) {
        this.projectCommentRepository = projectCommentRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public void create(ProjectCommentCreateRequestDTO requestDTO) {
        User currentUser = getCurrentUser();

        Optional<ProjectComment> existingComment = projectCommentRepository.findByProjectIdAndUserId(Long.valueOf(requestDTO.getProjectId()), currentUser.getId());
        if (existingComment.isPresent()) {
            throw new ProjectCommentAlreadyLeftException();
        }

        projectCommentRepository.save(ProjectComment.builder()
                .project(projectRepository.findById(Long.parseLong(requestDTO.getProjectId())))
                .user(currentUser)
                .commentText(requestDTO.getCommentText())
                .budget(new BigDecimal(requestDTO.getProposedPrice()))
                .build());
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}