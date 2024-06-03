package com.benhilger.gratitude.gratitude;

import java.sql.SQLException;

public interface IGratitudeRepository {

    Gratitude addGratitude(String userId, String message, int month, int date, int year) throws SQLException;

    Gratitude[] getAllGratuitiesForMonth(String userId, int month, int year) throws SQLException;
}
