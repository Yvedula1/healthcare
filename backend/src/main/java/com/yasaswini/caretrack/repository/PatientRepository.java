package com.yasaswini.caretrack.repository;

import com.yasaswini.caretrack.entity.AppointmentStatus;
import com.yasaswini.caretrack.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    long countByAppointmentStatus(AppointmentStatus appointmentStatus);

    Optional<Patient> findByEmailIgnoreCase(String email);
}
