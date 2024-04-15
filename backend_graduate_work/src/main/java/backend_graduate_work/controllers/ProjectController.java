package backend_graduate_work.controllers;

import backend_graduate_work.DTO.requestDTO.ProjectCreateRequestDTO;
import backend_graduate_work.DTO.responseDTO.ProjectCreateResponseDTO;
import backend_graduate_work.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/project")
@RestController
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProjectCreateResponseDTO> create(@RequestBody ProjectCreateRequestDTO projectCreateRequestDTO) {
        projectService.create(projectCreateRequestDTO);
        return ResponseEntity.ok(new ProjectCreateResponseDTO());
    }
}