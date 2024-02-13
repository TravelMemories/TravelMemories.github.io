package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.Stage;
import sr.tm.models.Travel;
import sr.tm.services.PhotoService;
import sr.tm.services.StageService;
import sr.tm.services.TravelService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:3000")
public class TravelController {
    PhotoService photoService;
    StageService stageService;
    TravelService travelService;

    @Autowired
    public TravelController(PhotoService photoService, StageService stageService, TravelService travelService) {
        this.photoService = photoService;
        this.stageService = stageService;
        this.travelService = travelService;
    }

    @GetMapping("/travel")
    public Page<Travel> getTravels(
            @RequestParam(name = "id", required = false) Long id,
            @RequestParam(name = "userId", required = false) Long userId,
            @RequestParam(name = "sort", defaultValue = "latest") String sort,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "40") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return travelService.getTravelsById(id,userId,  pageRequest, sort);
    }
    @GetMapping("/travel/public-photos")
    public List<Travel> getTravelsPublicPhotos(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "40") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return travelService.getTravelsWithPublicPhotos(pageRequest);
    }

    @DeleteMapping("/travel/delete")
    public ResponseEntity<Page<Travel>> deleteStage(@RequestParam(name = "id") Long id,@RequestParam(name = "userId") Long userID){
        PageRequest pageRequest = PageRequest.of(0, 40);
        Page<Travel> travels = travelService.getTravelsById(id, userID, pageRequest, "latest");
        boolean deleteSuccessful = travelService.deleteTravel(id);
        if(deleteSuccessful){
            if(travels.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(travels);
            }
            return ResponseEntity.ok(travels);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/travel/add")
    public ResponseEntity<Travel> addTravel(@RequestBody Travel travel){
        Optional<Travel> oldTravel = travelService.getTravelById(travel.getId());
        if(oldTravel.isPresent()){
            travel.setStages(oldTravel.get().getStages());
        }
        Travel newTravel = travelService.save(travel);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTravel);
    }
}