package com.resolve.devlog.resolve_devlog.dto;

import java.time.LocalDateTime;

import com.resolve.devlog.resolve_devlog.entity.Bugs.BugPriority;
import com.resolve.devlog.resolve_devlog.entity.Bugs.BugStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BugsDto {
    private Long id;
    private Long projectId;
    private Long reportedById;
    private String reportedByName;
    private Long assignedToId;
    private String assignedToName;
    private String title;
    private String description;
    private BugStatus status;
    private BugPriority priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
}
