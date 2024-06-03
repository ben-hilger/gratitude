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
    public Result<Gratitude[]> getGratitudesForUser(String userId, int month) {
        try {
            if (userId.isEmpty() || month < 0 || month > 11) {
                return new Result<>(null, ErrorType.USER_ERROR);
            }
            Gratitude[] gratitudes = this.repository.getAllGratuitiesForMonth(userId, month);
            return new Result<>(gratitudes, ErrorType.SUCCESS);
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
            System.out.println("Unable to add gratitude: " + exception.getMessage());
            return new Result<>(null, ErrorType.SERVER_ERROR);
        }
    }


}
