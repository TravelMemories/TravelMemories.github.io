package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.Likes;
import sr.tm.services.LikesService;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:8080")
public class LikesController {
    private final LikesService likesService;

    @Autowired
    public LikesController(LikesService likesService) {
        this.likesService = likesService;
    }

    @GetMapping("/likes")
    public Page<Likes> getLikes(@RequestParam(name = "user_id", required = false, defaultValue = "") String userId,
                                @RequestParam(name = "photo_id", required = false, defaultValue = "") String photoId,
                                @RequestParam(name = "page", required = false, defaultValue = "0") int page,
                                @RequestParam(name = "pageSize", required = false, defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return likesService.getAllLikesByUserIdAndPhotoId(userId, photoId, pageRequest);
    }

    @GetMapping("/likes/photo_likes_number")
    public int getCountOfLikesByPhoto(@RequestParam(name = "photoId") String photoId){
        return likesService.getCountOfLikesByPhotoId(photoId);
    }

    @PutMapping("/like/save")
    public ResponseEntity<Likes> addLike(@RequestBody Likes like){
        Likes addedLike = likesService.save(like);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedLike);
    }
}
