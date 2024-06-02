package com.benhilger.gratitude.auth;

import com.benhilger.gratitude.util.ErrorType;
import com.benhilger.gratitude.util.Result;
import org.springframework.stereotype.Service;

@Service
public class SessionService implements IAuthService {

    private final ISessionRepository repository;

    public SessionService(ISessionRepository repository) {
        this.repository = repository;
    }

    @Override
    public Result<String> generateAuthToken(String userId) {
        try {
            if (userId.isEmpty()) {
                return new Result<>(null, ErrorType.USER_ERROR);
            }
            String sessionId = this.repository.createSessionForUser(userId);
            return new Result<>(sessionId, ErrorType.SUCCESS);
        } catch (Exception exception) {
            System.out.println("Unable to create user session: userId: " + userId + ", exception: " + exception.getMessage());
            return new Result<>(null, ErrorType.SERVER_ERROR);
        }
    }

}