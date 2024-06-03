package com.benhilger.gratitude.gratitude;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Date;

@Service
public class GratitudeRepository implements IGratitudeRepository {

    private final Connection connection;

    public GratitudeRepository(Connection connection) {
        this.connection = connection;
    }

    private final String baseSQL = "SELECT id, message, date_gratitude_utc, date_added_utc, date_modified_utc FROM gratitude_entries";

    private Gratitude getById(String id) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(baseSQL + " WHERE id = ? LIMIT 1");
        statement.setObject(1, UUID.fromString(id));
        ResultSet rs = statement.executeQuery();

        if (rs.next()) {
            return new Gratitude(rs.getString(1), rs.getString(2), rs.getDate(3), rs.getDate(4), rs.getDate(5));
        }
        return null;
    }

    public Gratitude[] getAllGratuitiesForMonth(String userId, int month) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(baseSQL + " WHERE date_part('month', date_gratitude_utc) = ? AND user_id::text = ?");
        statement.setInt(1, month + 1);
        statement.setString(2, userId);
        ResultSet rs = statement.executeQuery();

        List<Gratitude> gratitudes = new ArrayList<>();
        while (rs.next()) {
            Gratitude gratitude = new Gratitude(rs.getString(1), rs.getString(2), rs.getDate(3), rs.getDate(4), rs.getDate(5));
            gratitudes.add(gratitude);
        }

        Gratitude[] gratitudesToReturn = new Gratitude[gratitudes.size()];
        gratitudes.toArray(gratitudesToReturn);
        return gratitudesToReturn;
    }

    public Gratitude addGratitude(String userId, String message, Date gratitudeDate) throws SQLException {
        UUID uuid = UUID.randomUUID();

        PreparedStatement statement = connection.prepareStatement("INSERT INTO gratitude_entries (id, message, date_gratitude_utc, user_id) VALUES (?, ?, ?, ?)");
        statement.setObject(1, uuid);
        statement.setString(2, message);
        statement.setDate(3, new java.sql.Date(gratitudeDate.getTime()));
        statement.setObject(4, UUID.fromString(userId));

        statement.execute();
        return this.getById(uuid.toString());
    }
}
