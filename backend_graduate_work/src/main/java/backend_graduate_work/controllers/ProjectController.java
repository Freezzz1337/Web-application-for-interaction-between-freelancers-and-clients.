package backend_graduate_work.controllers;

import backend_graduate_work.DTO.projectDTO.*;
import backend_graduate_work.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getProjects")
    public ResponseEntity<List<ProjectGetAllForEmployerResponseDTO>> getAllForEmployer() {
        return ResponseEntity.ok(projectService.getAllForEmployer());
    }

    @GetMapping("/projectDetails/{id}")
    public ResponseEntity<ProjectDetailsResponseDTO> getProjectDetails(@PathVariable long id) {
        return ResponseEntity.ok(projectService.getProjectDetails(id));
    }

    @PatchMapping("/edit")
    public ResponseEntity<ProjectEditResponseDTO> editProject(@RequestBody ProjectEditRequestDTO projectEditRequestDTO) {
        projectService.editProject(projectEditRequestDTO);
        return ResponseEntity.ok(new ProjectEditResponseDTO());
    }
}