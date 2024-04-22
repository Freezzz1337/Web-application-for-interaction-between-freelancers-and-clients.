package backend_graduate_work.services;

import backend_graduate_work.DTO.projectDTO.ProjectGetAllSubprojectTypesResponseDTO;
import backend_graduate_work.DTO.projectDTO.ProjectTypeRequestDTO;
import backend_graduate_work.models.SubprojectType;
import backend_graduate_work.repositories.SubprojectTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SubprojectTypeService {
    private final SubprojectTypeRepository subprojectTypeRepository;

    @Autowired
    public SubprojectTypeService(SubprojectTypeRepository subprojectTypeRepository) {
        this.subprojectTypeRepository = subprojectTypeRepository;
    }

    public List<ProjectGetAllSubprojectTypesResponseDTO> getAll(long id) {
        return subprojectTypeRepository.findByProjectTypeId(id)
                .stream()
                .map(subprojectType -> ProjectGetAllSubprojectTypesResponseDTO.builder()
                        .id(subprojectType.getId())
                        .name(subprojectType.getName())
                        .build())
                .toList();
    }
}
