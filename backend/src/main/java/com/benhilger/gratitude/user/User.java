package com.benhilger.gratitude.user;

public class User {

    private String id;

    private final String email;

    private String hashedPassword;

    private final String fullName;

    public User(String email, String hashedPassword, String fullName) {
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.fullName = fullName;
    }

    public User(String id, String email, String hashedPassword, String fullName) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.fullName = fullName;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }
}
