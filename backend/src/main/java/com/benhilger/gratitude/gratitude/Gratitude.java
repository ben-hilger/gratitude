package com.benhilger.gratitude.gratitude;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.Date;

@JsonSerialize()
public class Gratitude implements Serializable {

    private final String id;

    private final String message;

    private final Date dateAdded;

    private final Date dateModified;

    private final Date gratitudeDate;

    public Gratitude(String id, String message, Date gratitudeDate) {
        this.id = id;
        this.message = message;
        this.gratitudeDate = gratitudeDate;
        this.dateAdded = new Date();
        this.dateModified = new Date();
    }

    public Gratitude(String id, String message, Date gratitudeDate, Date dateAdded, Date dateModified) {
        this.id = id;
        this.message = message;
        this.gratitudeDate = gratitudeDate;
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

    public Date getGratitudeDate() {
        return gratitudeDate;
    }
}
