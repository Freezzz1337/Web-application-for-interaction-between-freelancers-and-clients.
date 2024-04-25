package backend_graduate_work.DTO.filterDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FilterDTO {
    String searchString;
    String filterBy;
    String maxBudget;
    String minBudget;
    String projectType;
    String subprojectType;
}