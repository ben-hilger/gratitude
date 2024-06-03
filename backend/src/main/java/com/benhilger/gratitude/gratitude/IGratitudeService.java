package com.benhilger.gratitude.gratitude;

import com.benhilger.gratitude.util.Result;

public interface IGratitudeService {

    Result<Gratitude[]> getGratitudesForUser(String userId, int month, int year);

    Result<Gratitude> addGratitude(String userId, String message, int month, int date, int year);

}
