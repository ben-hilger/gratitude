package com.benhilger.gratitude.auth;

import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.Calendar;
import java.util.UUID;

@Service
public class SessionRepository implements ISessionRepository{

    private final Connection connection;

    public SessionRepository(Connection connection) {
        this.connection = connection;
    }

    @Override
    public String createSessionForUser(String userId) throws SQLException, IllegalStateException {
        PreparedStatement statement = this.connection.prepareStatement("INSERT INTO user_sessions (id, user_id, expires_date_utc) VALUES (?, ?, ?)");
        UUID sessionID = UUID.randomUUID();
        statement.setObject(1, sessionID);
        statement.setObject(2, UUID.fromString(userId));
        statement.setDate(3, getExpirationDate());

        statement.execute();
        return sessionID.toString();
    }

    @Override
    public String getUserIdFromSession(String sessionId) throws SQLException {
        PreparedStatement statement = this.connection.prepareStatement("SELECT user_id FROM user_sessions WHERE id = ? AND expires_date_utc >= NOW() LIMIT 1");
        statement.setObject(1, UUID.fromString(sessionId));

        ResultSet resultSet = statement.executeQuery();

        if (resultSet.next()) {
            return resultSet.getString(1);
        }
        return null;
    }

    private Date getExpirationDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new java.util.Date());
        calendar.add(Calendar.DATE, 1);
        return new Date(calendar.getTime().getTime());
    }
}
