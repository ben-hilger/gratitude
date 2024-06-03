package com.benhilger.gratitude.gratitude;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;

@Service
public class GratitudeRepository implements IGratitudeRepository {

    private final Connection connection;

    public GratitudeRepository(Connection connection) {
        this.connection = connection;
    }

    private final String baseSQL = "SELECT id, message, month, date, year, date_added_utc, date_modified_utc FROM gratitude_entries";

    private Gratitude getById(String id) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(baseSQL + " WHERE id = ? LIMIT 1");
        statement.setObject(1, UUID.fromString(id));
        ResultSet rs = statement.executeQuery();

        if (rs.next()) {
            return new Gratitude(rs.getString(1), rs.getString(2),
                    rs.getInt(3), rs.getInt(4), rs.getInt(5),
                    rs.getDate(6), rs.getDate(7));
        }
        return null;
    }

    public Gratitude[] getAllGratuitiesForMonth(String userId, int month, int year) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(baseSQL + " WHERE month = ? AND year = ? AND user_id::text = ?");
        statement.setInt(1, month);
        statement.setInt(2, year);
        statement.setString(3, userId);
        ResultSet rs = statement.executeQuery();

        List<Gratitude> gratitudes = new ArrayList<>();
        while (rs.next()) {
            Gratitude gratitude = new Gratitude(rs.getString(1), rs.getString(2),
                    rs.getInt(3), rs.getInt(4), rs.getInt(5),
                    rs.getDate(6), rs.getDate(7));
            gratitudes.add(gratitude);
        }

        Gratitude[] gratitudesToReturn = new Gratitude[gratitudes.size()];
        gratitudes.toArray(gratitudesToReturn);
        return gratitudesToReturn;
    }

    public Gratitude addGratitude(String userId, String message, int month, int date, int year) throws SQLException {
        UUID uuid = UUID.randomUUID();

        PreparedStatement statement = connection.prepareStatement("INSERT INTO gratitude_entries (id, message, month, date, year, user_id) VALUES (?, ?, ?, ?, ?, ?)");
        statement.setObject(1, uuid);
        statement.setString(2, message);
        statement.setInt(3, month);
        statement.setInt(4, date);
        statement.setInt(5, year);
        statement.setObject(6, UUID.fromString(userId));

        statement.execute();
        return this.getById(uuid.toString());
    }
}
