package com.benhilger.gratitude.gratitude;

public class GetGratitudeResponse {

    public Gratitude[] gratitudes;

    public GetGratitudeResponse(Gratitude[] gratitudes) {
        this.gratitudes = gratitudes;
    }

    public Gratitude[] getGratitudes() {
        return gratitudes;
    }
}
