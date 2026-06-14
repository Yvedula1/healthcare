package com.yasaswini.caretrack.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Aggregated counts for the dashboard cards.
 */
@Getter
@AllArgsConstructor
public class DashboardSummary {

    private long totalPatients;
    private long scheduled;
    private long completed;
    private long cancelled;
}
