package backend_graduate_work.repositories;

import backend_graduate_work.models.Chat;
import backend_graduate_work.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByEmployerOrFreelancer(User employer, User freelancer);

    List<Chat> findAllByProjectId(long id);

    Chat findByProjectIdAndEmployerIdAndFreelancerId(long projectId, long employerId, long freelancerId);

    boolean existsByEmployerIdAndFreelancerIdAndProjectId(long employerId, long freelancerId, long projectId);

    Chat findById(long id);
}
