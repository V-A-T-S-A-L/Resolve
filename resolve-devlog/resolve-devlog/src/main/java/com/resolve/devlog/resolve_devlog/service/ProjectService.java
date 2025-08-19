package com.resolve.devlog.resolve_devlog.service;

import java.util.List;

import com.resolve.devlog.resolve_devlog.dto.ProjectDto;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto, Long userId);
    ProjectDto updateProject(Long id, ProjectDto projectDto);
    List<ProjectDto> getProjects(Long id);
    ProjectDto getProjectById(Long id);
    void deleteProject(Long id);
}
