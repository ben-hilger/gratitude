package com.benhilger.gratitude.gratitude;

import com.benhilger.gratitude.util.Result;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public interface IGratitudeService {

    Result<HashMap<String, List<Gratitude>>> getGratitudesForUser(String userId, int month);

    Result<Gratitude> addGratitude(String userId, String message, Date gratitudeDate);

}
