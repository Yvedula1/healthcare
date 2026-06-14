package com.yasaswini.caretrack.dto;

import com.yasaswini.caretrack.entity.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Outgoing representation of a patient.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private Integer age;
    private String email;
    private String phone;
    private String condition;
    private LocalDate appointmentDate;
    private AppointmentStatus appointmentStatus;
}
