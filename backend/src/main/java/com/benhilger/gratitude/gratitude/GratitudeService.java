package com.benhilger.gratitude.gratitude;

import com.benhilger.gratitude.util.ErrorType;
import com.benhilger.gratitude.util.Result;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class GratitudeService implements IGratitudeService {

    private final IGratitudeRepository repository;

    public GratitudeService(IGratitudeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Result<HashMap<String, List<Gratitude>>> getGratitudesForUser(String userId, int month) {
        try {
            if (userId.isEmpty() || month < 0 || month > 11) {
                return new Result<>(null, ErrorType.USER_ERROR);
            }
            List<Gratitude> gratitudes = this.repository.getAllGratuitiesForMonth(userId, month);

            HashMap<String, List<Gratitude>> organizedGratitudes = new HashMap<>();
            for (Gratitude gratitude : gratitudes) {
                List<Gratitude> currentGratitudes = organizedGratitudes.getOrDefault(gratitude.getGratitudeDate(), new ArrayList<>());
                currentGratitudes.add(gratitude);
                organizedGratitudes.put(gratitude.getGratitudeDate(), currentGratitudes);
            }
            return new Result<>(organizedGratitudes, ErrorType.SUCCESS);
        } catch (SQLException exception) {
            System.out.println("There was an issue getting the gratitude:" + exception.getMessage());
            return new Result<>(null, ErrorType.SERVER_ERROR);
        }
    }

    @Override
    public Result<Gratitude> addGratitude(String userId, String message, Date gratitudeDate) {
        if (userId.isEmpty() || message.isEmpty()) {
            return new Result<>(null, ErrorType.USER_ERROR);
        }
        try {
            return new Result<>(this.repository.addGratitude(userId, message, gratitudeDate), ErrorType.SUCCESS);
        } catch (SQLException exception) {
            return new Result<>(null, ErrorType.SERVER_ERROR);
        }
    }

    @Override
    public boolean deleteGratitude(String userId, String gratitudeId) {
        return false;
    }

    @Override
    public Gratitude updateGratitude(String userId, String message, Date gratitudeDate) {
        return null;
    }
}
