package backend_graduate_work.DTO.filterDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FilterDTO {
    private String searchString;
    private String filterBy;
    private String maxBudget;
    private String minBudget;
    private String projectType;
    private String subprojectType;
    private long numberOfPages;
}