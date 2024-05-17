package backend_graduate_work.services;

import backend_graduate_work.models.Review;
import backend_graduate_work.models.User;
import backend_graduate_work.repositories.ProjectRepository;
import backend_graduate_work.repositories.ReviewRepository;
import backend_graduate_work.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public void save(String freelancerId, User employer, String projectId, String comment, int rating) {
        reviewRepository.save(Review.builder()
                .freelancer(userRepository.findById(Long.parseLong(freelancerId)))
                .employer(employer)
                .project(projectRepository.findById(Long.parseLong(projectId)))
                .comment(comment)
                .rating(rating)
                .build());
    }
}