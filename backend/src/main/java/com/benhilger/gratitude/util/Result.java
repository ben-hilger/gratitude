package com.benhilger.gratitude.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Result<T>  {

    public T value;

    public ErrorType error;

    public Result(T value, ErrorType error) {
        this.value = value;
        this.error = error;
    }

    public ResponseEntity<T> intoResponseEntity() {
        return switch (this.error) {
            case ErrorType.SUCCESS -> new ResponseEntity<>(this.value, HttpStatus.OK);
            case ErrorType.USER_ERROR -> new ResponseEntity<>(this.value, HttpStatus.BAD_REQUEST);
            case ErrorType.CONFLICT -> new ResponseEntity<>(this.value, HttpStatus.CONFLICT);
            default -> new ResponseEntity<>(this.value, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }
}
