package com.benhilger.gratitude.auth;

import java.sql.SQLException;

public interface ISessionRepository {

    String createSessionForUser(String userId) throws SQLException, IllegalStateException;

    String getUserIdFromSession(String sessionId) throws SQLException;
}
