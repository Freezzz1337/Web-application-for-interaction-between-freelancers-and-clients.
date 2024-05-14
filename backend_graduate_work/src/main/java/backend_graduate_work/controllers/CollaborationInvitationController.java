package backend_graduate_work.controllers;

import backend_graduate_work.DTO.collaborationInvitationDTO.*;
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
    public ResponseEntity<CollaborationInvitationCreateResponseDTO> create(@RequestBody CollaborationInvitationCreateRequestDTO createRequestDTO) {
        collaborationInvitationService.create(createRequestDTO);
        return ResponseEntity.ok(new CollaborationInvitationCreateResponseDTO());
    }

    @PatchMapping("/accept/{invitationId}")
    public ResponseEntity<CollaborationInvitationAcceptResponseDTO> acceptCollaborationInvitation(@PathVariable String invitationId) {
        collaborationInvitationService.acceptCollaborationInvitation(invitationId);
        return ResponseEntity.ok(new CollaborationInvitationAcceptResponseDTO());
    }

    @PatchMapping("/decline/{invitationId}")
    public ResponseEntity<CollaborationInvitationDeclineResponseDTO> declineResponseDTOResponseEntity(@PathVariable String invitationId) {
        collaborationInvitationService.declineCollaborationInvitation(invitationId);
        return ResponseEntity.ok(new CollaborationInvitationDeclineResponseDTO());
    }
}
