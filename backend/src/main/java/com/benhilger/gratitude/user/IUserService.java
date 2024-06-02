package com.benhilger.gratitude.user;

import com.benhilger.gratitude.util.Result;
import org.springframework.stereotype.Service;

@Service
public interface IUserService {
    public Result<User> signInUser(String email, String plainTextPassword);
    public Result<User> createUser(String email, String name, String plainTextPassword);
}
