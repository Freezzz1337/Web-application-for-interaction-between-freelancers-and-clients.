package backend_graduate_work.repositories;

import backend_graduate_work.models.ProjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTypeRepository extends JpaRepository<ProjectType, Long> {
}