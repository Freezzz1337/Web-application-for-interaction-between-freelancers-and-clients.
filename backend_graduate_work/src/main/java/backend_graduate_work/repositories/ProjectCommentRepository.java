package backend_graduate_work.repositories;

import backend_graduate_work.models.ProjectComment;
import backend_graduate_work.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectCommentRepository extends JpaRepository<ProjectComment, Long> {
    Optional<ProjectComment> findByProjectIdAndUserId(Long projectId, Long userId);

    Optional<List<ProjectComment>> findAllByProjectId(Long projectId);

}
