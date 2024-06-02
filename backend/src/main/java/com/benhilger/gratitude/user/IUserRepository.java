package com.benhilger.gratitude.user;

import java.sql.SQLException;

public interface IUserRepository {

    User getUserByEmail(String email) throws SQLException;

    User createUser(User user) throws SQLException, IllegalStateException;
}
