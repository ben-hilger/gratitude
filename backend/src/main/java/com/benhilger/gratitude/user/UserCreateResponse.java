package com.benhilger.gratitude.user;

public class UserCreateResponse {

    private final String name;

    private final String id;

    private final String email;

    public UserCreateResponse(String id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
    }
}

