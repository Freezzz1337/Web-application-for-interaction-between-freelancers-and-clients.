package backend_graduate_work.repositories;

import backend_graduate_work.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByEmployerId(long id);

    Project findById(long id);
}
