package com.resolve.devlog.resolve_devlog.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bugs")
public class Bugs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by", nullable = false)
    private User reportedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to", nullable = true)
    private User assignedTo;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BugStatus status = BugStatus.OPEN;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BugPriority priority = BugPriority.MEDIUM;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private LocalDateTime closedAt;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum BugStatus {
        OPEN,
        IN_PROGRESS,
        RESOLVED,
        CLOSED,
        REOPENED
    }

    public enum BugPriority {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }
}
