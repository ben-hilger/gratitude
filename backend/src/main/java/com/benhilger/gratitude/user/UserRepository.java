package com.benhilger.gratitude.user;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Service
public class UserRepository implements IUserRepository {

    private final Connection connection;

    public UserRepository(Connection connection) {
        this.connection = connection;
    }
    public User getUserByEmail(String email) throws SQLException {
        PreparedStatement statement = this.connection.prepareStatement("SELECT id, email, hashed_password, name FROM users WHERE email = ? LIMIT 1");
        statement.setString(1, email);
        ResultSet result = statement.executeQuery();

        if (result.next()) {
            System.out.println("SDFSDFS");
            return new User(result.getString(1), result.getString(2), result.getString(3), result.getString(4));
        }
        return null;
    }

    public User createUser(User user) throws SQLException, IllegalStateException {
        if (this.getUserByEmail(user.getEmail()) != null) {
            throw new IllegalStateException("Email already exists");
        }

        PreparedStatement statement = this.connection.prepareStatement("INSERT INTO users (id, name, email, hashed_password) VALUES (?, ?, ?, ?)");
        statement.setObject(1, UUID.randomUUID());
        statement.setString(2, user.getFullName());
        statement.setString(3, user.getEmail());
        statement.setString(4, user.getHashedPassword());
        statement.execute();
        return this.getUserByEmail(user.getEmail());
    }

}
