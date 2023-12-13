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
            @RequestParam(name = "userEmail", required = false) String userEmail,
            @RequestParam(name = "sort", defaultValue = "latest") String sort,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return travelService.getTravelsByUserEmail(userEmail, pageRequest, sort);
    }

    @DeleteMapping("travel/delete")
    public ResponseEntity<String> deleteTravel(@RequestParam(name = "id")Long id){
        boolean deleteSuccessful = travelService.deleteTravel(id);
        if(deleteSuccessful){
            return ResponseEntity.ok("Delete successful");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel not found or delete unsuccessful");
    }
}