package com.resolve.devlog.resolve_devlog.mapper;

import org.springframework.stereotype.Component;

import com.resolve.devlog.resolve_devlog.dto.ProjectDto;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.User;

@Component
public class ProjectMapper {

    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
            project.getId(),
            project.getName(),
            project.getDescription(),
            project.getCreatedBy().getId(),
            project.getCreatedBy().getName(),
            project.getCreatedAt(),
            project.getUpdatedAt()
        );
    }

    public static Project mapToProject(ProjectDto projectDto, User user) {
        return new Project(
            projectDto.getId(),
            projectDto.getName(),
            projectDto.getDescription(),
            user,
            projectDto.getCreatedAt(),
            projectDto.getUpdatedAt()
        );
    }
}
