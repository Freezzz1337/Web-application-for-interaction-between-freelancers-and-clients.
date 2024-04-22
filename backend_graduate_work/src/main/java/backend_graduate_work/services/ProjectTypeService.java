package backend_graduate_work.services;

import backend_graduate_work.DTO.projectDTO.ProjectGetAllTypesResponseDTO;
import backend_graduate_work.models.ProjectType;
import backend_graduate_work.repositories.ProjectTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProjectTypeService {
    private final ProjectTypeRepository projectTypeRepository;

    @Autowired
    public ProjectTypeService(ProjectTypeRepository projectTypeRepository) {
        this.projectTypeRepository = projectTypeRepository;
    }

    public List<ProjectGetAllTypesResponseDTO> getAll() {
        return projectTypeRepository.findAll().stream()
                .map(projectType -> ProjectGetAllTypesResponseDTO.builder()
                        .id(projectType.getId())
                        .name(projectType.getName())
                        .build())
                .toList();
    }
}
