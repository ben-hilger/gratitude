package com.benhilger.gratitude.auth;

import java.sql.SQLException;

public interface ISessionRepository {

    public String createSessionForUser(String userId) throws SQLException, IllegalStateException;

}
