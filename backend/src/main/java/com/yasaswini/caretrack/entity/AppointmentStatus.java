package com.yasaswini.caretrack.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Appointment status. Stored in the DB as its name (SCHEDULED, ...) but
 * serialized to/from the capitalized labels (Scheduled, ...) used by the API.
 */
public enum AppointmentStatus {

    SCHEDULED("Scheduled"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");

    private final String label;

    AppointmentStatus(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static AppointmentStatus fromValue(String value) {
        if (value != null) {
            for (AppointmentStatus status : values()) {
                if (status.label.equalsIgnoreCase(value) || status.name().equalsIgnoreCase(value)) {
                    return status;
                }
            }
        }
        throw new IllegalArgumentException(
                "Invalid appointmentStatus '" + value + "'. Allowed values: Scheduled, Completed, Cancelled");
    }
}
