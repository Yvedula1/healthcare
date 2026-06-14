package com.yasaswini.caretrack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Consistent error body returned by the global exception handler.
 */
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String message;

    /** Field-level validation messages, present only for validation failures. */
    private final Map<String, String> fieldErrors;

    public ErrorResponse(int status, String error, String message, Map<String, String> fieldErrors) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.fieldErrors = fieldErrors;
    }

    public ErrorResponse(int status, String error, String message) {
        this(status, error, message, null);
    }
}
