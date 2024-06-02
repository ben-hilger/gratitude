package com.benhilger.gratitude.user;

import com.benhilger.gratitude.util.ErrorType;
import com.benhilger.gratitude.util.Result;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class UserService implements IUserService {

    private final IUserRepository repository;

    private final PasswordEncoder encoder;

    public UserService(IUserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public Result<User> signInUser(String email, String plainTextPassword) {
        try {
            User user = this.repository.getUserByEmail(email);
            if (user == null || !isValidPassword(user.getHashedPassword(), plainTextPassword)) {
                return new Result<>(null, ErrorType.USER_ERROR);
            }
            return new Result<>(user, ErrorType.SUCCESS);
        } catch (SQLException exception) {
            System.out.println("Unable to get user: " + exception.getMessage());
            return new Result<>(null, ErrorType.SERVER_ERROR);
        }
    }

    public Result<User> createUser(String email, String name, String plainTextPassword) {
        try {
            if (email.isEmpty() || name.isEmpty() || plainTextPassword.isEmpty()) {
                return new Result<>(null, ErrorType.USER_ERROR);
            }
            User newUser = new User(email, hashPassword(plainTextPassword), name);
            User updatedUser = this.repository.createUser(newUser);
            return new Result<>(updatedUser, ErrorType.SUCCESS);
        } catch (SQLException exception) {
            System.out.println("Unable to create user: " + exception.getMessage());
            return new Result<>(null, ErrorType.SERVER_ERROR);
        } catch (IllegalStateException exception) {
            System.out.println("Attempted to create account with an already-existing email");
            return new Result<>(null, ErrorType.CONFLICT);
        }
    }

    private boolean isValidPassword(String hashedPassword, String plainTextPassword) {
        return this.encoder.matches(plainTextPassword, hashedPassword);
    }

    private String hashPassword(String password) {
        return this.encoder.encode(password);
    }

}