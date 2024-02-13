package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Likes;
import sr.tm.models.Photo;
import sr.tm.repositories.LikesDAORepository;

import java.util.Objects;
import java.util.Optional;

@Transactional
@Service
public class LikesService {
    private final LikesDAORepository likesDAORepository;
    private PhotoService photoService;

    @Autowired
    public LikesService(LikesDAORepository likesDAORepository, PhotoService photoService) {
        this.likesDAORepository = likesDAORepository;
        this.photoService = photoService;
    }

    public boolean save(Long photoId,Long userId){
        Likes foundLike = likesDAORepository.findByPhotoIdAndUserId(photoId, userId);
        if(foundLike == null){
            Likes like = new Likes();
            Optional<Photo> photo = photoService.getById(photoId);
            if(photo.isEmpty()) throw new RuntimeException();
            like.setPhoto(photo.get());
            like.setUserId(userId);
            likesDAORepository.save(like);
            return true;
        }
        likesDAORepository.delete(foundLike);
        return false;
    }

    public Page<Likes> getAllLikesByPhotoId(String photoId, Pageable pageable){
            return likesDAORepository.findAllByPhotoId(Long.valueOf(photoId), pageable);

    }

}
