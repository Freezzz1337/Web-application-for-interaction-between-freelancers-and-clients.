package backend_graduate_work.services;

import backend_graduate_work.DTO.userDTO.UserProfileEditRequestDTO;
import backend_graduate_work.DTO.userDTO.UserProfileResponseDTO.UserProfileData;
import backend_graduate_work.DTO.userDTO.UserProfileResponseDTO.UserProfileProjectStatistics;
import backend_graduate_work.DTO.userDTO.UserProfileResponseDTO.UserProfileResponseDTO;
import backend_graduate_work.DTO.userDTO.UserProfileResponseDTO.UserReview;
import backend_graduate_work.models.Project;
import backend_graduate_work.models.Review;
import backend_graduate_work.models.User;
import backend_graduate_work.models.enums.StatusProject;
import backend_graduate_work.models.enums.UserTypeEnum;
import backend_graduate_work.repositories.ProjectRepository;
import backend_graduate_work.repositories.ReviewRepository;
import backend_graduate_work.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public UserService(UserRepository userRepository, ProjectRepository projectRepository, ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.reviewRepository = reviewRepository;
    }

    public UserProfileResponseDTO getUserProfileData() {
        User currentUser = getCurrentUser();
        List<Project> projects = null;
        List<Review> reviews = null;

        if (currentUser.getUserTypeEnum() == UserTypeEnum.EMPLOYER) {
            projects = projectRepository.findAllByEmployerId(currentUser.getId());
        } else {
            reviews = reviewRepository.findAllByFreelancerId(getCurrentUser().getId());
        }

        return UserProfileResponseDTO.builder()
                .userProfileData(UserProfileData.builder()
                        .fullName(currentUser.getFullName())
                        .bio(currentUser.getBio())
                        .userType(String.valueOf(currentUser.getUserTypeEnum()))
                        .profilePicture(currentUser.getProfilePicture())
                        .build())
                .projectStatistics(projects != null ? UserProfileProjectStatistics.builder()
                        .numberOfProjects(numberOfProjects(projects))
                        .numberOfActiveProjects(numberOfActiveProjects(projects))
                        .numberOfCompletedProjects(numberOfCompletedProjects(projects))
                        .build() : null)
                .reviewList(reviews != null ? getReviewList(reviews) : null)
                .build();
    }

    private List<UserReview> getReviewList(List<Review> reviewList) {
        return reviewList.stream()
                .map(review -> UserReview.builder()
                        .rating(review.getRating())
                        .comment(review.getComment())
                        .reviewDate(review.getReviewDate())
                        .employerName(review.getEmployer().getFullName())
                        .budget(review.getProject().getBudget())
                        .projectName(review.getProject().getTitle())
                        .build())
                .toList();
    }

    private int numberOfProjects(List<Project> projects) {
        return projects.size();
    }

    private int numberOfActiveProjects(List<Project> projects) {
        return (int) projects.stream().filter(project -> !project.getStatus().equals(StatusProject.COMPLETED) && !project.getStatus().equals(StatusProject.CANCELLED))
                .count();
    }

    private int numberOfCompletedProjects(List<Project> projects) {
        return (int) projects.stream().filter(project -> project.getStatus().equals(StatusProject.COMPLETED))
                .count();
    }

    @Transactional
    public void userEdit(UserProfileEditRequestDTO profileRequestDTO) {
        User currentUser = getCurrentUser();

        currentUser.setFullName(profileRequestDTO.getFullName());
        currentUser.setBio(profileRequestDTO.getBio());
        currentUser.setProfilePicture(profileRequestDTO.getProfilePicture());
        currentUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(currentUser);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
