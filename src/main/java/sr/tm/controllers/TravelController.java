package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.Travel;
import sr.tm.services.PhotoService;
import sr.tm.services.StageService;
import sr.tm.services.TravelService;

@RestController
@RequestMapping(value = "/api")
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
            @RequestParam(name = "userId", required = false) Long userId,
            @RequestParam(name = "sort", defaultValue = "latest") String sort,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return travelService.getTravelsByEmail(userId, pageRequest, sort);
    }

    @DeleteMapping("/travel/delete")
    public ResponseEntity<Page<Travel>>  deleteTravel(@RequestParam(name = "id") Long id){
        boolean deleteSuccessful = travelService.deleteTravel(id);
        PageRequest pageRequest = PageRequest.of(0, 20);
        if(deleteSuccessful){
            return ResponseEntity.ok().body(travelService.getTravelsByEmail(null, pageRequest, "latest"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(travelService.getTravelsByEmail(null, pageRequest, "latest"));
    }

    @PutMapping("/travel/add")
    public ResponseEntity<Page<Travel>> addTravel(@RequestBody Travel travel){
        travelService.save(travel);
        PageRequest pageRequest = PageRequest.of(0, 20);
        return ResponseEntity.status(HttpStatus.CREATED).body(travelService.getTravelsByEmail(null, pageRequest, "latest"));
    }
}