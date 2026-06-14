package com.yasaswini.caretrack.service;

import com.yasaswini.caretrack.dto.PatientRequest;
import com.yasaswini.caretrack.dto.PatientResponse;
import com.yasaswini.caretrack.entity.Patient;
import com.yasaswini.caretrack.exception.ResourceNotFoundException;
import com.yasaswini.caretrack.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Transactional(readOnly = true)
    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PatientResponse getPatientById(Long id) {
        Patient patient = findPatientOrThrow(id);
        return toResponse(patient);
    }

    @Transactional
    public PatientResponse createPatient(PatientRequest request) {
        Patient patient = new Patient();
        applyRequest(patient, request);
        return toResponse(patientRepository.save(patient));
    }

    @Transactional
    public PatientResponse updatePatient(Long id, PatientRequest request) {
        Patient patient = findPatientOrThrow(id);
        applyRequest(patient, request);
        return toResponse(patientRepository.save(patient));
    }

    @Transactional
    public void deletePatient(Long id) {
        Patient patient = findPatientOrThrow(id);
        patientRepository.delete(patient);
    }

    private Patient findPatientOrThrow(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id " + id));
    }

    private void applyRequest(Patient patient, PatientRequest request) {
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setAge(request.getAge());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setCondition(request.getCondition());
        patient.setAppointmentDate(request.getAppointmentDate());
        patient.setAppointmentStatus(request.getAppointmentStatus());
    }

    private PatientResponse toResponse(Patient patient) {
        return new PatientResponse(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getAge(),
                patient.getEmail(),
                patient.getPhone(),
                patient.getCondition(),
                patient.getAppointmentDate(),
                patient.getAppointmentStatus());
    }
}
