package com.yasaswini.caretrack.exception;

/**
 * Thrown when creating/updating a resource would violate a uniqueness rule
 * (e.g. an email already used by another patient).
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
