package backend_graduate_work.controllers;

import backend_graduate_work.DTO.projectCommentDTO.ProjectCommentCreateRequestDTO;
import backend_graduate_work.DTO.projectCommentDTO.ProjectCommentCreateResponseDTO;
import backend_graduate_work.services.ProjectCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projectComment")
public class ProjectCommentController {
    private final ProjectCommentService projectCommentService;

    @Autowired
    public ProjectCommentController(ProjectCommentService projectCommentService) {
        this.projectCommentService = projectCommentService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProjectCommentCreateResponseDTO> create(@RequestBody ProjectCommentCreateRequestDTO requestDTO) {
        projectCommentService.create(requestDTO);
        return ResponseEntity.ok(new ProjectCommentCreateResponseDTO());
    }

}
