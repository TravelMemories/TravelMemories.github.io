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
@CrossOrigin("http://localhost:8080")
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
    public ResponseEntity<Page<Stage>> deleteStage(@RequestParam(name = "id") Long id){
        boolean deleteSuccessful = stageService.deleteStage(id);
        PageRequest pageRequest = PageRequest.of(0, 20);
        if(deleteSuccessful){
            return ResponseEntity.ok(stageService.getAllStagesByUserEmail(null, pageRequest, "latest"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(stageService.getAllStagesByUserEmail(null, pageRequest, "latest"));
    }

    @PutMapping("/stage/add")
    public ResponseEntity<Page<Stage>> addStage(@RequestBody Stage stage){
        stageService.save(stage);
        PageRequest pageRequest = PageRequest.of(0, 20);
        return ResponseEntity.status(HttpStatus.CREATED).body(stageService.getAllStagesByUserEmail(null, pageRequest, "latest"));
    }
}
