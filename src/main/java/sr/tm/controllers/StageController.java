package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.Stage;
import sr.tm.models.Travel;
import sr.tm.services.StageService;
import sr.tm.services.TravelService;

import java.io.Console;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:3000")
public class StageController {
    private final StageService stageService;
    TravelService travelService;

    @Autowired
    public StageController(StageService stageService, TravelService travelService) {

        this.stageService = stageService;
        this.travelService = travelService;
    }

    @GetMapping("/stage")
    public Page<Stage> getStages(
            @RequestParam(name = "travelId", required = false) String travelId,
            @RequestParam(name = "sort", defaultValue = "latest") String sort,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "100") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return stageService.getAllStagesByUserEmail(travelId, pageRequest, sort);
    }

    @DeleteMapping("/stage/delete")
    public ResponseEntity<Stage> deleteStage(@RequestParam(name = "id") Long id){
        PageRequest pageRequest = PageRequest.of(0, 40);
        Optional<Stage> stage = stageService.getById(id);
        boolean deleteSuccessful = stageService.deleteStage(id);
        if(deleteSuccessful){
            if(stage.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok().body(stage.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/stage/add")
    public ResponseEntity<Stage> addStage(@RequestParam(name = "travelId") Long travelId,@RequestBody Stage stage){

        Optional<Travel> travel = travelService.getTravelById(travelId);
        if(travel.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        stage.setTravel(travel.get());
        Optional<Stage> oldStage = stageService.getById(stage.getId());
        if(oldStage.isPresent()){
            stage.setPhotos(oldStage.get().getPhotos());
        }
        Stage newStage = stageService.save(stage);
        PageRequest pageRequest = PageRequest.of(0, 40);
        return ResponseEntity.status(HttpStatus.CREATED).body(newStage);
    }
}
