package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
    public Page<Stage> getStages(@RequestParam(name = "travelId", required = false) String travelId,
                                 @RequestParam(name = "sort", defaultValue = "latest") String sort,
                                 @RequestParam(name = "page", defaultValue = "0") int page,
                                 @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return stageService.getAllStagesByUserEmail(travelId, pageRequest, sort);
    }
}
