package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.Photo;
import sr.tm.services.PhotoService;

@Controller
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
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return photoService.getAllPhotosByStageId(stageId, pageRequest, sort);
    }

    @DeleteMapping("/photo/delete")
    public ResponseEntity<String> deletePhoto(@RequestParam(name = "id") Long id){
        boolean deleteSuccessful = photoService.deletePhoto(id);
        if(deleteSuccessful){
            return ResponseEntity.ok("Photo deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Photo not found or delete unsuccessful.");
    }

    @PutMapping("/photo/add")
    public ResponseEntity<Photo> addPhoto(@RequestBody Photo photo){
        Photo addedPhoto = photoService.save(photo);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedPhoto);
    }
}
