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

    public Page<Likes> getAllLikesByUserIdAndPhotoId(String userId, String photoId, Pageable pageable){
        if(Objects.equals(userId, "") && Objects.equals(photoId, "")){
            return likesDAORepository.findAll(pageable);
        }
        if(Objects.equals(userId, "") && !Objects.equals(photoId, "")){
            return likesDAORepository.findAllByPhotoId(Long.valueOf(photoId), pageable);
        }
        if(!Objects.equals(userId, "") && Objects.equals(photoId, "")){
            return likesDAORepository.findAllByUserId(Long.valueOf(userId), pageable);
        }
        return likesDAORepository.findAllByPhotoIdAndUserId(Long.valueOf(photoId), Long.valueOf(userId), pageable);
    }

    public int getCountOfLikesByPhotoId(String photoId){
        return likesDAORepository.countByPhotoId(Long.getLong(photoId));
    }
}
