package com.benhilger.gratitude.auth;

import com.benhilger.gratitude.util.Result;
import org.springframework.stereotype.Service;

public interface IAuthService {

    public Result<String> generateAuthToken(String userId);
}
