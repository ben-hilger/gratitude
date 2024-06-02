package com.benhilger.gratitude.auth;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
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

    private Date getExpirationDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new java.util.Date());
        calendar.add(Calendar.DATE, 1);
        return new Date(calendar.getTime().getTime());
    }
}
