package com.benhilger.gratitude.user;

public class UserLoginResponse {
    private String sessionId;

    public UserLoginResponse(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionId() {
        return sessionId;
    }
}
