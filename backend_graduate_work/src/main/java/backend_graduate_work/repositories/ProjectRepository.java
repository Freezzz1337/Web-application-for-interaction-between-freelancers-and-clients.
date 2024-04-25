package backend_graduate_work.repositories;

import backend_graduate_work.models.Project;
import backend_graduate_work.models.enums.StatusProject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByEmployerId(long id);
    List<Project> findAllByStatus(StatusProject status, Pageable pageable);

    List<Project> findAllByStatusAndTitleContaining(StatusProject status, String title);

    Project findById(long id);
}
