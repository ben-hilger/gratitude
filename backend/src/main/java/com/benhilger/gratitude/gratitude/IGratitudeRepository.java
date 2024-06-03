package com.benhilger.gratitude.gratitude;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

public interface IGratitudeRepository {

    Gratitude addGratitude(String userId, String message, Date gratitudeDate) throws SQLException;

    Gratitude[] getAllGratuitiesForMonth(String userId, int month) throws SQLException;
}
