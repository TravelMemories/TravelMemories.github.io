package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Likes;

public interface LikesDAORepository extends JpaRepository<Likes, Long> {
    Page<Likes> findAllByUserId(String userId, Pageable pageable);
    Page<Likes> findAllByPhotoId(String photoId, Pageable pageable);
    Page<Likes> findAllByPhotoIdAndUserId(String photoId, String userId, Pageable pageable);
    int countByPhotoId(Long photoId);
}