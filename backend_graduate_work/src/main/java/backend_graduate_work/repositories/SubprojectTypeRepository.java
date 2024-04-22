package backend_graduate_work.repositories;

import backend_graduate_work.models.SubprojectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubprojectTypeRepository extends JpaRepository<SubprojectType, Long> {
    List<SubprojectType> findByProjectTypeId(long id);
    SubprojectType findById (long id);
}