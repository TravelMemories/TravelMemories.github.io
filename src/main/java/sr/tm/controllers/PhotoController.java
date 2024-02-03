package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.Photo;
import sr.tm.services.PhotoService;

@RestController
@RequestMapping(value = "/api")
public class PhotoController {
    PhotoService photoService;
    @Autowired
    public PhotoController(PhotoService photoService){
        this.photoService = photoService;
    }

    @GetMapping("/photo")
    public Page<Photo> getPhotos(
            @RequestParam(name = "stageId", required = false) String stageId,
            @RequestParam(name = "sort", defaultValue = "latest") String sort,
            @RequestParam(name = "privacy", defaultValue = "0") Long privacy,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return photoService.getAllPhotosByStageId(stageId, pageRequest, sort, privacy);
    }

    @DeleteMapping("/photo/delete")
    public ResponseEntity<Page<Photo>> deletePhoto(@RequestParam(name = "id") Long id){
        boolean deleteSuccessful = photoService.deletePhoto(id);
        PageRequest pageRequest = PageRequest.of(0, 20);
        if(deleteSuccessful){
            return ResponseEntity.ok(photoService.getAllPhotosByStageId(null, pageRequest, "latest", 0L));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(photoService.getAllPhotosByStageId(null, pageRequest, "latest", 0L));
    }

    @PutMapping("/photo/add")
    public ResponseEntity<Page<Photo>> addPhoto(@RequestBody Photo photo){
        PageRequest pageRequest = PageRequest.of(0, 20);
        photoService.save(photo);
        return ResponseEntity.status(HttpStatus.CREATED).body(photoService.getAllPhotosByStageId(null, pageRequest, "latest", 0L));
    }

}
