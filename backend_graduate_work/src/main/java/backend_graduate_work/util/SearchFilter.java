package backend_graduate_work.util;

import backend_graduate_work.DTO.filterDTO.FilterDTO;
import backend_graduate_work.models.Project;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SearchFilter {

    public static List<Project> filterProjects(List<Project> projects, FilterDTO filterDTO) {
        if (!filterDTO.getMaxBudget().isEmpty() ||
                !filterDTO.getMinBudget().isEmpty()) {
            projects = filterProjectsByBudget(projects, filterDTO.getMinBudget(), filterDTO.getMaxBudget());
        }

        if ((!filterDTO.getProjectType().isEmpty() && !filterDTO.getProjectType().equals("0")) ||
                (!filterDTO.getSubprojectType().isEmpty() && !filterDTO.getSubprojectType().equals("0"))) {
            projects = filterProjectsByType(projects, filterDTO.getProjectType(), filterDTO.getSubprojectType());
        }

        if (!filterDTO.getFilterBy().isEmpty()) {
            projects = filterProjectsBy(projects, filterDTO.getFilterBy());
        }

        return projects;
    }

    private static List<Project> filterProjectsByType(List<Project> projects, String projectType, String subprojectType) {
        if (!subprojectType.isEmpty()) {
            return projects.stream()
                    .filter(project -> project.getSubprojectType().getId() == Long.parseLong(subprojectType))
                    .toList();
        } else {
            return projects.stream()
                    .filter(project -> project.getSubprojectType().getProjectType().getId() == Long.parseLong(projectType))
                    .toList();
        }
    }

    private static List<Project> filterProjectsBy(List<Project> projects, String filterBy) {
        return switch (filterBy) {
            case "newest" -> projects.stream()
                    .sorted(Comparator.comparing(Project::getCreatedAt).reversed())
                    .toList();
            case "oldest" -> projects.stream()
                    .sorted(Comparator.comparing(Project::getCreatedAt))
                    .collect(Collectors.toList());
            case "lowerBudget" -> projects.stream()
                    .sorted(Comparator.comparing(Project::getBudget))
                    .toList();
            case "higherBudget" -> projects.stream()
                    .sorted(Comparator.comparing(Project::getBudget).reversed())
                    .toList();
            case "nearestDeadline" -> projects.stream()
                    .sorted(Comparator.comparing(Project::getDeadline))
                    .toList();
            case "farthestDeadline" -> projects.stream()
                    .sorted(Comparator.comparing(Project::getDeadline).reversed())
                    .toList();
            default -> projects;
        };
    }

    private static List<Project> filterProjectsByBudget(List<Project> projects, String minBudget, String maxBudget) {
        if (!minBudget.isEmpty() && !maxBudget.isEmpty()) {
            BigDecimal min = new BigDecimal(minBudget);
            BigDecimal max = new BigDecimal(maxBudget);

            return projects.stream()
                    .filter(project -> {
                        BigDecimal projectBudget = project.getBudget();
                        return projectBudget.compareTo(min) >= 0 && projectBudget.compareTo(max) <= 0;
                    })
                    .sorted(Comparator.comparing(Project::getBudget))
                    .toList();
        } else if (!minBudget.isEmpty()) {
            BigDecimal min = new BigDecimal(minBudget);

            return projects.stream()
                    .filter(project -> {
                        BigDecimal projectBudget = project.getBudget();
                        return projectBudget.compareTo(min) >= 0;
                    })
                    .sorted(Comparator.comparing(Project::getBudget))
                    .toList();
        } else {
            BigDecimal max = new BigDecimal(maxBudget);

            return projects.stream()
                    .filter(project -> {
                        BigDecimal projectBudget = project.getBudget();
                        return projectBudget.compareTo(max) <= 0;
                    })
                    .sorted(Comparator.comparing(Project::getBudget))
                    .toList();
        }

    }
}
