package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.Stage;
import sr.tm.services.StageService;

@RestController
@RequestMapping(value = "/api")
public class StageController {
    private final StageService stageService;

    @Autowired
    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @GetMapping("/stage")
    public Page<Stage> getStages(
            @RequestParam(name = "travelId", required = false) String travelId,
            @RequestParam(name = "sort", defaultValue = "latest") String sort,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return stageService.getAllStagesByUserEmail(travelId, pageRequest, sort);
    }

    @DeleteMapping("/stage/delete")
    public ResponseEntity<String> deleteStage(@RequestParam(name = "id") Long id){
        boolean deleteSuccessful = stageService.deleteStage(id);
        if(deleteSuccessful){
            return ResponseEntity.ok("Stage deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stage not found or delete unsuccessful.");
    }

    @PutMapping("/stage/add")
    public ResponseEntity<Stage> addStage(@RequestBody Stage stage){
        Stage deletedStage = stageService.save(stage);
        return ResponseEntity.status(HttpStatus.CREATED).body(deletedStage);
    }
}
