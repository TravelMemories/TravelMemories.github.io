package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Likes;

public interface LikesDAORepository extends JpaRepository<Likes, Long> {
    Page<Likes> findAllByPhotoId(Long photo_id, Pageable pageable);
    Likes findByPhotoIdAndUserId(Long photoId, Long userId);
}
