package com.benhilger.gratitude.gratitude;

import com.benhilger.gratitude.util.ErrorType;
import com.benhilger.gratitude.util.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/gratitude")
public class GratitudeController {

    private final IGratitudeService gratitudeService;

    public GratitudeController(IGratitudeService service) {
        this.gratitudeService = service;
    }

    @GetMapping()
    @CrossOrigin()
    public ResponseEntity<HashMap<String, List<Gratitude>>> getAllGratitude(@RequestParam(name = "month") Integer month) {
        Result<HashMap<String, List<Gratitude>>> result = this.gratitudeService.getGratitudesForUser("test", month);

        return this.processResult(result.value, result.error);
    }

    @PostMapping()
    @CrossOrigin()
    public ResponseEntity<Gratitude> addGratitude(@RequestBody GratitudeRequest gratitudeRequest) {
        Result<Gratitude> result = this.gratitudeService.addGratitude("test", gratitudeRequest.message, gratitudeRequest.gratitudeDate);

        return this.processResult(result.value, result.error);
    }

    private <T> ResponseEntity<T> processResult(T value, ErrorType errorType) {
        return switch (errorType) {
            case SUCCESS -> new ResponseEntity<>(value, HttpStatus.OK);
            case USER_ERROR -> new ResponseEntity<>(value, HttpStatus.BAD_REQUEST);
            default -> new ResponseEntity<>(value, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }
}
