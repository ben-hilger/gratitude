package com.benhilger.gratitude.user;

import com.benhilger.gratitude.auth.IAuthService;
import com.benhilger.gratitude.util.ErrorType;
import com.benhilger.gratitude.util.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final IUserService userService;
    private final IAuthService authService;

    public UserController(IUserService userService, IAuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }


    @PostMapping("create")
    @CrossOrigin()
    public ResponseEntity<UserCreateResponse> createUser(@RequestBody UserCreateRequest userCreateRequest) {
       Result<User> userResult = this.userService.createUser(userCreateRequest.getEmail(), userCreateRequest.getName(), userCreateRequest.getPassword());
       if (userResult.error != ErrorType.SUCCESS) {
           Result<UserCreateResponse> createErrorResponse = new Result<>(null, userResult.error);
           return createErrorResponse.intoResponseEntity();
       }
       return new ResponseEntity<>(new UserCreateResponse(userResult.value.getId(), userResult.value.getEmail(), userResult.value.getFullName()), HttpStatus.OK);
    }

    @PostMapping("login")
    @CrossOrigin()
    public ResponseEntity<UserLoginResponse> authenticateUser(@RequestBody UserLoginRequest userLoginRequest) {
        Result<User> authenticated = this.userService.signInUser(userLoginRequest.getEmail(), userLoginRequest.getPassword());

        if (authenticated.error != ErrorType.SUCCESS) {
            Result<UserLoginResponse> unauthenticatedResponse = new Result<>(null, authenticated.error);
            return unauthenticatedResponse.intoResponseEntity();
        }

        Result<String> sessionResult = this.authService.generateAuthToken(authenticated.value.getId());

        if (sessionResult.error != ErrorType.SUCCESS) {
            Result<UserLoginResponse> unauthenticatedResponse = new Result<>(null, sessionResult.error);
            return unauthenticatedResponse.intoResponseEntity();
        }

        return new ResponseEntity<>(new UserLoginResponse(sessionResult.value), HttpStatus.OK);
    }
}
