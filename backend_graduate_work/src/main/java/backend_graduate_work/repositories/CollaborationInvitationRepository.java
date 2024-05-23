package backend_graduate_work.repositories;

import backend_graduate_work.models.CollaborationInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollaborationInvitationRepository extends JpaRepository<CollaborationInvitation, Long> {
    CollaborationInvitation findById(long id);
    List<CollaborationInvitation> findByFreelancerIdAndEmployerId(long freelancerId, long employerId);
    List<CollaborationInvitation> findByFreelancerIdAndEmployerIdAndProjectId(long freelancerId, long employerId, long projectId);

    List<CollaborationInvitation> findByFreelancerId(long id);
    List<CollaborationInvitation> findByEmployerId(long id);


}