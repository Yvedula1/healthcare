package com.yasaswini.caretrack.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yasaswini.caretrack.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedHashMap;
import java.util.Map;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PatientApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PatientRepository patientRepository;

    @BeforeEach
    void cleanDatabase() {
        patientRepository.deleteAll();
    }

    private Map<String, Object> validRequest() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("firstName", "Jane");
        body.put("lastName", "Doe");
        body.put("age", 34);
        body.put("email", "jane@example.com");
        body.put("phone", "555-1010");
        body.put("condition", "Diabetes");
        body.put("appointmentDate", "2026-07-01");
        body.put("appointmentStatus", "Scheduled");
        return body;
    }

    private String json(Object body) throws Exception {
        return objectMapper.writeValueAsString(body);
    }

    private long createPatient(Map<String, Object> body) throws Exception {
        String response = mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(body)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(response).get("id").asLong();
    }

    @Test
    void createPatient_returns201WithBody() throws Exception {
        mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(validRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.firstName", is("Jane")))
                .andExpect(jsonPath("$.appointmentStatus", is("Scheduled")));
    }

    @Test
    void createPatient_withInvalidFields_returns400WithFieldErrors() throws Exception {
        Map<String, Object> body = validRequest();
        body.put("firstName", "");
        body.put("age", 0);
        body.put("email", "not-an-email");

        mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(body)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.fieldErrors.firstName").exists())
                .andExpect(jsonPath("$.fieldErrors.age").exists())
                .andExpect(jsonPath("$.fieldErrors.email").exists());
    }

    @Test
    void createPatient_withInvalidStatus_returns400() throws Exception {
        Map<String, Object> body = validRequest();
        body.put("appointmentStatus", "Pending");

        mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(body)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", is(
                        "Invalid appointmentStatus 'Pending'. Allowed values: Scheduled, Completed, Cancelled")));
    }

    @Test
    void createPatient_withDuplicateEmail_returns409() throws Exception {
        createPatient(validRequest());

        Map<String, Object> duplicate = validRequest();
        duplicate.put("firstName", "Other");

        mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(duplicate)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status", is(409)));
    }

    @Test
    void getAllPatients_returnsCreatedPatients() throws Exception {
        createPatient(validRequest());

        mockMvc.perform(get("/api/patients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", is(1)))
                .andExpect(jsonPath("$[0].email", is("jane@example.com")));
    }

    @Test
    void getPatientById_whenMissing_returns404() throws Exception {
        mockMvc.perform(get("/api/patients/{id}", 999999))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));
    }

    @Test
    void updatePatient_returns200WithUpdatedValues() throws Exception {
        long id = createPatient(validRequest());

        Map<String, Object> update = validRequest();
        update.put("age", 35);
        update.put("appointmentStatus", "Cancelled");

        mockMvc.perform(put("/api/patients/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.age", is(35)))
                .andExpect(jsonPath("$.appointmentStatus", is("Cancelled")));
    }

    @Test
    void deletePatient_returns204_andSubsequentGetReturns404() throws Exception {
        long id = createPatient(validRequest());

        mockMvc.perform(delete("/api/patients/{id}", id))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/patients/{id}", id))
                .andExpect(status().isNotFound());
    }

    @Test
    void deletePatient_whenMissing_returns404() throws Exception {
        mockMvc.perform(delete("/api/patients/{id}", 999999))
                .andExpect(status().isNotFound());
    }
}
