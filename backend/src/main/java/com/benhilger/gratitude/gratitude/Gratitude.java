package com.benhilger.gratitude.gratitude;

import java.util.Date;

public class Gratitude {

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

    public String getGratitudeDate() {
        return this.gratitudeDate.toInstant().toString();
    }
}
