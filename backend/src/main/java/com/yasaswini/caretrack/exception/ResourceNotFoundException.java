package com.yasaswini.caretrack.exception;

/**
 * Thrown when a requested resource (e.g. a patient) does not exist.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
