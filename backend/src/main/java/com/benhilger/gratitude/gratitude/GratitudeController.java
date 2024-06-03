package com.benhilger.gratitude.gratitude;

import com.benhilger.gratitude.auth.IAuthService;
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
    private final IAuthService authService;

    public GratitudeController(IGratitudeService service, IAuthService authService) {
        this.gratitudeService = service;
        this.authService = authService;
    }

    private String getAuthorizationToken(String token) {
        String[] splitToken = token.split("Bearer ");
        if (splitToken.length != 2) {
            return null;
        }
        return splitToken[1];
    }

    private String extractUserIdFromAuthorizationToken(String authorization) throws IllegalArgumentException {
        String token = getAuthorizationToken(authorization);
        if (token == null) {
            throw new IllegalArgumentException("Invalid token");
        }
        Result<String> tokenResult = this.authService.validateAuthToken(token);
        if (tokenResult.error != ErrorType.SUCCESS) {
            throw new IllegalArgumentException("Invalid token");
        }
        return tokenResult.value;
    }

    @GetMapping()
    @CrossOrigin()
    public ResponseEntity<GetGratitudeResponse> getAllGratitude(@RequestHeader(value = "Authorization") String authorization, @RequestParam(name = "month") Integer month) {
        String userId;
        try {
            userId = extractUserIdFromAuthorizationToken(authorization);
        } catch (IllegalArgumentException exception) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Result<Gratitude[]> result = this.gratitudeService.getGratitudesForUser(userId, month);

        if (result.error == ErrorType.SUCCESS) {
           return new ResponseEntity<>(new GetGratitudeResponse(result.value), HttpStatus.OK);
        }

        return new Result<GetGratitudeResponse>(null, result.error).intoResponseEntity();
    }

    @PostMapping()
    @CrossOrigin()
    public ResponseEntity<Gratitude> addGratitude(@RequestHeader(value = "Authorization") String authorization, @RequestBody GratitudeRequest gratitudeRequest) {
        String userId = null;
        try {
            userId = extractUserIdFromAuthorizationToken(authorization);
        } catch (IllegalArgumentException exception) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Result<Gratitude> result = this.gratitudeService.addGratitude(userId, gratitudeRequest.message, gratitudeRequest.gratitudeDate);

        return result.intoResponseEntity();
    }
}
