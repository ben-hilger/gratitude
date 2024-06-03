package com.benhilger.gratitude.gratitude;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

@JsonSerialize()
public class Gratitude implements Serializable {

    private final String id;

    private final String message;

    private final int month;

    private final int date;

    private final Date dateAdded;

    private final Date dateModified;

    public Gratitude(String id, String message, Date gratitudeDate, Date dateAdded, Date dateModified) {
        this.id = id;
        this.message = message;

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(gratitudeDate);
        this.date = calendar.get(Calendar.DATE);
        this.month = calendar.get(Calendar.MONTH);

        this.dateAdded = dateAdded;
        this.dateModified = dateModified;
    }

    public String getId() {
        return id;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public Date getDateModified() {
        return dateModified;
    }

    public String getMessage() {
        return message;
    }

    public int getDate() {
        return date;
    }

    public int getMonth() {
        return month;
    }
}
