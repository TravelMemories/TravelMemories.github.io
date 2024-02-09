package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Likes;
import sr.tm.repositories.LikesDAORepository;

import java.util.Objects;

@Transactional
@Service
public class LikesService {
    private final LikesDAORepository likesDAORepository;

    @Autowired
    public LikesService(LikesDAORepository likesDAORepository) {
        this.likesDAORepository = likesDAORepository;
    }

    public Likes save(Likes like){
        return likesDAORepository.save(like);
    }

    public Page<Likes> getAllLikesByPhotoId(String photoId, Pageable pageable){
            return likesDAORepository.findAllByPhotoId(Long.valueOf(photoId), pageable);

    }

}
