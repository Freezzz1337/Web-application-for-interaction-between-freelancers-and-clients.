package backend_graduate_work.controllers;

import backend_graduate_work.DTO.filterDTO.FilterDTO;
import backend_graduate_work.DTO.filterDTO.ProjectPagesDTO;
import backend_graduate_work.DTO.projectDTO.*;
import backend_graduate_work.DTO.projectDTO.ProjectDetailsForEmployerResponseDTO.ProjectDetailsForEmployerResponseDTO;
import backend_graduate_work.DTO.projectDTO.ProjectGetAllForEmployerResponseDTO;
import backend_graduate_work.services.ProjectService;
import backend_graduate_work.services.ProjectTypeService;
import backend_graduate_work.services.SubprojectTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/project")
@RestController
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectTypeService projectTypeService;
    private final SubprojectTypeService subprojectTypeService;

    @Autowired
    public ProjectController(ProjectService projectService, ProjectTypeService projectTypeService, SubprojectTypeService subprojectTypeService) {
        this.projectService = projectService;
        this.projectTypeService = projectTypeService;
        this.subprojectTypeService = subprojectTypeService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProjectCreateResponseDTO> create(@RequestBody ProjectCreateRequestDTO projectCreateRequestDTO) {
        projectService.create(projectCreateRequestDTO);
        return ResponseEntity.ok(new ProjectCreateResponseDTO());
    }

    @GetMapping("/getProjectsForEmployer")
    public ResponseEntity<List<ProjectGetAllForEmployerResponseDTO>> getAllForEmployer() {
        return ResponseEntity.ok(projectService.getAllForEmployer());
    }

    @GetMapping("/projectDetailsForEmployer/{id}")
    public ResponseEntity<ProjectDetailsForEmployerResponseDTO> getProjectForEmployerDetails(@PathVariable long id) {
        return ResponseEntity.ok(projectService.getProjectForEmployerDetails(id));
    }

    @GetMapping("/projectDetailsForFreelancer/{id}")
    public ResponseEntity<ProjectDetailsForFreelancerResponseDTO> getProjectForFreelancerDetails(@PathVariable long id) {
        return ResponseEntity.ok(projectService.getProjectDetailsForFreelancer(id));
    }

    @PatchMapping("/edit")
    public ResponseEntity<ProjectEditResponseDTO> editProject(@RequestBody ProjectEditRequestDTO projectEditRequestDTO) {
        projectService.editProject(projectEditRequestDTO);
        return ResponseEntity.ok(new ProjectEditResponseDTO());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProjectDeleteResponseDTO> delete(@PathVariable long id) {
        projectService.delete(id);
        return ResponseEntity.ok(new ProjectDeleteResponseDTO());
    }

    @GetMapping("/getTypes")
    public ResponseEntity<List<ProjectGetAllTypesResponseDTO>> getAllTypes() {
        return ResponseEntity.ok(projectTypeService.getAll());
    }

    @GetMapping("/getSubprojectsTypes/{id}")
    public ResponseEntity<List<ProjectGetAllSubprojectTypesResponseDTO>> getAllSubprojectsTypes(@PathVariable long id) {
        return ResponseEntity.ok(subprojectTypeService.getAll(id));
    }

    @GetMapping("/getProjectsForFreelancer")
    public ResponseEntity<ProjectPagesDTO> getProjectsForFreelancer(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(projectService.getAllForFreelancer(page, size));
    }

    @PostMapping("/filter")
    public ResponseEntity<ProjectPagesDTO> getProjectsFiltered(@RequestBody FilterDTO filterDTO,
                                                               @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(projectService.getFilteredProjectsForFreelancer(filterDTO, page, size));
    }

    @GetMapping("/getProjectForCollaborationInvitation/{id}")
    public ResponseEntity<ProjectGetFroCollaborationInvitationResponseDTO> getProjectForCollaborationInvitation(@PathVariable String id){
        return ResponseEntity.ok(projectService.getProjectForCollaborationInvitation(id));
    }


}