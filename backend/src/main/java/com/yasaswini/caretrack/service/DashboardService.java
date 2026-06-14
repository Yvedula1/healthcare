package com.yasaswini.caretrack.service;

import com.yasaswini.caretrack.dto.DashboardSummary;
import com.yasaswini.caretrack.entity.AppointmentStatus;
import com.yasaswini.caretrack.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final PatientRepository patientRepository;

    public DashboardService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Transactional(readOnly = true)
    public DashboardSummary getSummary() {
        return new DashboardSummary(
                patientRepository.count(),
                patientRepository.countByAppointmentStatus(AppointmentStatus.SCHEDULED),
                patientRepository.countByAppointmentStatus(AppointmentStatus.COMPLETED),
                patientRepository.countByAppointmentStatus(AppointmentStatus.CANCELLED));
    }
}
