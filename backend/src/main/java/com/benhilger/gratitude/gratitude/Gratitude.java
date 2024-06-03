package com.benhilger.gratitude.gratitude;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.Date;

@JsonSerialize()
public class Gratitude implements Serializable {

    private final String id;

    private final String message;

    private final int month;

    private final int date;

    private final int year;

    private final Date dateAdded;

    private final Date dateModified;

    public Gratitude(String id, String message, int month, int day, int year, Date dateAdded, Date dateModified) {
        this.id = id;
        this.message = message;

        this.month = month;
        this.year = year;
        this.date = day;

        this.dateAdded = dateAdded;
        this.dateModified = dateModified;
    }

    public int getYear() {
        return year;
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
