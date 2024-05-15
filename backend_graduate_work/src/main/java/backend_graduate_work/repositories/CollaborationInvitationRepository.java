package backend_graduate_work.repositories;

import backend_graduate_work.models.CollaborationInvitation;
import backend_graduate_work.models.enums.InvitationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollaborationInvitationRepository extends JpaRepository<CollaborationInvitation, Long> {
    CollaborationInvitation findById(long id);
    CollaborationInvitation findByFreelancerIdAndEmployerIdAndStatus(long freelancerId, long employerId, InvitationStatus status);
    List<CollaborationInvitation> findByFreelancerIdAndEmployerIdAndProjectId(long freelancerId, long employerId, long projectId);
}