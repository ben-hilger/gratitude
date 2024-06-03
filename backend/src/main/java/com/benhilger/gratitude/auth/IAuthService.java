package com.benhilger.gratitude.auth;

import com.benhilger.gratitude.util.Result;

public interface IAuthService {
    Result<String> validateAuthToken(String token);
    Result<String> generateAuthToken(String userId);
}