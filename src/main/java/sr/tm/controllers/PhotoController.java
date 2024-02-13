package sr.tm.controllers;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sr.tm.models.Likes;
import sr.tm.models.Photo;
import sr.tm.models.Stage;
import sr.tm.models.Travel;
import sr.tm.services.PhotoService;
import sr.tm.services.StageService;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:3000")
public class PhotoController {
    PhotoService photoService;
    StageService stageService;
    @Autowired
    public PhotoController(PhotoService photoService, StageService stageService){
        this.photoService = photoService;
        this.stageService = stageService;
    }

    @GetMapping("/photo")
    public Page<Photo> getPhotos(
            @RequestParam(name ="id",required = false) Long id,
            @RequestParam(name = "stageId", required = false) String stageId,
            @RequestParam(name = "sort", defaultValue = "latest") String sort,
            @RequestParam(name = "privacy", defaultValue = "0") Long privacy,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        if(id!=null){
            return photoService.getById(id, pageRequest);
        }
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

//    @PutMapping("/photo/add")
//    public ResponseEntity<Photo> addStage(@RequestParam(name = "stageId") Long stageId, @ModelAttribute Photo photoData, @ModelAttribute MultipartFile photoFile){
//
//        Optional<Stage> stage = stageService.getById(stageId);
//        if(stage.isEmpty()){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//        photoData.setStage(stage.get());
//        Photo newPhoto = photoService.save(photoData);
//        PageRequest pageRequest = PageRequest.of(0, 40);
//        return ResponseEntity.status(HttpStatus.CREATED).body(newPhoto);
//    }
    @PutMapping("/photo/add")
    public ResponseEntity<Photo> addStage(@RequestParam(value = "id", required = false) Long id,
                                          @RequestParam("stageId") Long stageId,
                                          @RequestPart(value = "photoData", required = false) MultipartFile photoData,
                                          @RequestParam("photoDate") String photoDate,
                                          @RequestParam("description") String description,
                                          @RequestParam("locationName") String locationName,
                                          @RequestParam("latitude") Double latitude,
                                          @RequestParam("longitude") Double longitude,
                                          @RequestParam("privacy") Long privacy) {

        Optional<Stage> stage = stageService.getById(stageId);
        if(stage.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Photo photo = new Photo();
        photo.setStage(stage.get());
        if(id != null){
            photo.setId(id);
        }
        if(photoData == null){
            if(id == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            Optional<Photo> oldPhoto = photoService.getById(id);
            if(oldPhoto.isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            photo.setPhotoData(oldPhoto.get().getPhotoData());
        }
        else{
            try {
                photo.setPhotoData(photoData.getBytes());
            } catch (IOException e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }

        photo.setDescription(description);
        photo.setPhotoDate(photoDate);
        photo.setLocationName(locationName);
        photo.setLatitude(latitude);
        photo.setLongitude(longitude);
        photo.setPrivacy(privacy);
        photo.setLikes(new HashSet<>());
        if(id != null){
            Optional<Photo> oldPhoto = photoService.getById(id);
            if(oldPhoto.isPresent()){
                photo.setLikes(oldPhoto.get().getLikes());
            }
        }
        Photo newPhoto = photoService.save(photo);
        PageRequest pageRequest = PageRequest.of(0, 40);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPhoto);
    }

}
