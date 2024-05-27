package backend_graduate_work.controllers;

import backend_graduate_work.DTO.collaborationInvitationDTO.*;
import backend_graduate_work.DTO.collaborationInvitationDTO.checkDeadlinDTO.CheckDeadlineDTO;
import backend_graduate_work.DTO.collaborationInvitationDTO.collaborationInvitationCompletedRequestDTO.CollaborationInvitationCompletedRequestDTO;
import backend_graduate_work.services.CollaborationInvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/collaborationInvitation")
public class CollaborationInvitationController {
    private final CollaborationInvitationService collaborationInvitationService;

    @Autowired
    public CollaborationInvitationController(CollaborationInvitationService collaborationInvitationService) {
        this.collaborationInvitationService = collaborationInvitationService;
    }

    @PostMapping("/create")
    public ResponseEntity<CollaborationInvitationCreateResponseDTO> createCollaborationInvitation(@RequestBody CollaborationInvitationCreateRequestDTO createRequestDTO) {
        collaborationInvitationService.create(createRequestDTO);
        return ResponseEntity.ok(new CollaborationInvitationCreateResponseDTO());
    }

    @PatchMapping("/accept/{invitationId}")
    public ResponseEntity<CollaborationInvitationAcceptResponseDTO> acceptCollaborationInvitation(@PathVariable String invitationId) {
        collaborationInvitationService.acceptCollaborationInvitation(invitationId);
        return ResponseEntity.ok(new CollaborationInvitationAcceptResponseDTO());
    }

    @GetMapping("/getCollaboration")
    public ResponseEntity<CollaborationInvitationGetResponseDTO> getCollaborationInvitation(@RequestParam long projectId, @RequestParam long userId) {
        return ResponseEntity.ok(collaborationInvitationService.getCollaboration(projectId, userId));
    }

    @PatchMapping("/edit")
    public ResponseEntity<CollaborationInvitationEditResponseDTO> editCollaborationInvitation(@RequestBody CollaborationInvitationCreateRequestDTO requestDTO) {
        collaborationInvitationService.edit(requestDTO);
        return ResponseEntity.ok(new CollaborationInvitationEditResponseDTO());
    }

    @PatchMapping("/decline")
    public ResponseEntity<CollaborationInvitationDeclineResponseDTO> declineCollaborationInvitation(@RequestBody CollaborationInvitationCreateRequestDTO requestDTO) {
        collaborationInvitationService.declineCollaborationInvitation(requestDTO);
        return ResponseEntity.ok(new CollaborationInvitationDeclineResponseDTO());
    }

    @PatchMapping("/declineInvitation/{id}")
    public ResponseEntity<CollaborationInvitationDeclineResponseDTO> declineCollaborationInvitation(@PathVariable String id) {
        collaborationInvitationService.declineInvitation(id);
        return ResponseEntity.ok(new CollaborationInvitationDeclineResponseDTO());
    }

    @PostMapping("/complete")
    private ResponseEntity<CollaborationInvitationCompletedResponseDTO> completeCollaborationInvitation(@RequestBody CollaborationInvitationCompletedRequestDTO requestDTO) {
        collaborationInvitationService.completedCollaborationInvitation(requestDTO);
        return ResponseEntity.ok(new CollaborationInvitationCompletedResponseDTO());
    }

    @GetMapping("/checkDeadline")
    private ResponseEntity<CheckDeadlineDTO> checkDeadline() {
        return ResponseEntity.ok(collaborationInvitationService.checkDeadline());
    }
}