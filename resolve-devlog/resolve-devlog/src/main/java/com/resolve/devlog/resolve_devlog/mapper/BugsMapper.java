package com.resolve.devlog.resolve_devlog.mapper;

import org.springframework.stereotype.Component;

import com.resolve.devlog.resolve_devlog.dto.BugsDto;
import com.resolve.devlog.resolve_devlog.entity.Bugs;

@Component
public class BugsMapper {
    public static BugsDto mapToBugsDto(Bugs bugs) {
        return new BugsDto(
            bugs.getId(),
            bugs.getProject().getId(),
            bugs.getReportedBy().getId(),
            bugs.getReportedBy().getName(),
            bugs.getAssignedTo() != null ? bugs.getAssignedTo().getId() : null,
            bugs.getAssignedTo() != null ? bugs.getAssignedTo().getName() : null,
            bugs.getTitle(),
            bugs.getDescription(),
            bugs.getStatus(),
            bugs.getPriority(),
            bugs.getCreatedAt(),
            bugs.getUpdatedAt(),
            bugs.getClosedAt()
        );
    }
}
