package com.yasaswini.caretrack.dto;

import com.yasaswini.caretrack.entity.AppointmentStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Incoming payload for creating/updating a patient.
 */
@Getter
@Setter
public class PatientRequest {

    @NotBlank(message = "firstName is required")
    private String firstName;

    @NotBlank(message = "lastName is required")
    private String lastName;

    @NotNull(message = "age is required")
    @Min(value = 1, message = "age must be greater than 0")
    @Max(value = 130, message = "age must be 130 or less")
    private Integer age;

    @NotBlank(message = "email is required")
    @Email(message = "email must be a valid email address")
    private String email;

    private String phone;

    private String condition;

    private LocalDate appointmentDate;

    @NotNull(message = "appointmentStatus is required and must be one of: Scheduled, Completed, Cancelled")
    private AppointmentStatus appointmentStatus;
}
