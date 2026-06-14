package com.yasaswini.caretrack;

import com.yasaswini.caretrack.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThatCode;

/**
 * Verifies the Spring context starts and the PostgreSQL connection works
 * (the repository call hits the real caretrack_test database).
 */
@SpringBootTest
class CaretrackApplicationTests {

    @Autowired
    private PatientRepository patientRepository;

    @Test
    void contextLoadsAndDatabaseIsReachable() {
        assertThatCode(() -> patientRepository.count()).doesNotThrowAnyException();
    }
}
