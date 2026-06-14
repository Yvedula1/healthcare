package com.yasaswini.caretrack.controller;

import com.yasaswini.caretrack.entity.AppointmentStatus;
import com.yasaswini.caretrack.entity.Patient;
import com.yasaswini.caretrack.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DashboardApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PatientRepository patientRepository;

    @BeforeEach
    void cleanDatabase() {
        patientRepository.deleteAll();
    }

    private void savePatient(String email, AppointmentStatus status) {
        Patient patient = new Patient();
        patient.setFirstName("Test");
        patient.setLastName("Patient");
        patient.setAge(30);
        patient.setEmail(email);
        patient.setAppointmentStatus(status);
        patientRepository.save(patient);
    }

    @Test
    void dashboard_withNoPatients_returnsZeroCounts() throws Exception {
        mockMvc.perform(get("/api/dashboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPatients", is(0)))
                .andExpect(jsonPath("$.scheduled", is(0)))
                .andExpect(jsonPath("$.completed", is(0)))
                .andExpect(jsonPath("$.cancelled", is(0)));
    }

    @Test
    void dashboard_countsByStatus() throws Exception {
        savePatient("a@example.com", AppointmentStatus.SCHEDULED);
        savePatient("b@example.com", AppointmentStatus.SCHEDULED);
        savePatient("c@example.com", AppointmentStatus.COMPLETED);
        savePatient("d@example.com", AppointmentStatus.CANCELLED);

        mockMvc.perform(get("/api/dashboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPatients", is(4)))
                .andExpect(jsonPath("$.scheduled", is(2)))
                .andExpect(jsonPath("$.completed", is(1)))
                .andExpect(jsonPath("$.cancelled", is(1)));
    }
}
