package com.benhilger.gratitude.user;

import java.sql.SQLException;

public interface IUserRepository {

    public User getUserByEmail(String email) throws SQLException;

    public User createUser(User user) throws SQLException, IllegalStateException;
}
