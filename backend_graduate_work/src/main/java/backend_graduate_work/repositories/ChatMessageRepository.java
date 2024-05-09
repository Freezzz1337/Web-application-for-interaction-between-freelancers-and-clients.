package backend_graduate_work.repositories;

import backend_graduate_work.models.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    boolean existsBySenderIdAndChatFreelancerId(long senderId, long freelancerId);

    ChatMessage findFirstByChatIdOrderByCreatedAtDesc(long chatId);

}
