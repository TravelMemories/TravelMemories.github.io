package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Photo;

public interface PhotoDAORepository extends JpaRepository<Photo, Long> {
    Page<Photo> findAllByPrivacyOrderByPhotoDateAsc(Pageable pageable, String privacy);
    Page<Photo> findAllByPrivacyOrderByPhotoDateDesc(Pageable pageable, String privacy);
    Page<Photo> findAllByStageIdAndPrivacyOrderByPhotoDateAsc(Long stage_id, Pageable pageable, String privacy);
    Page<Photo> findAllByStageIdAndPrivacyOrderByPhotoDateDesc(Long stage_id, Pageable pageable, String privacy);
}
