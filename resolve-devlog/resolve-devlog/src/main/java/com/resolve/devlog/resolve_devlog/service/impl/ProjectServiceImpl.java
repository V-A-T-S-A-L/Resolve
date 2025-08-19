package com.resolve.devlog.resolve_devlog.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resolve.devlog.resolve_devlog.dto.ProjectDto;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.User;
import com.resolve.devlog.resolve_devlog.exception.ResourceNotFoundException;
import com.resolve.devlog.resolve_devlog.mapper.ProjectMapper;
import com.resolve.devlog.resolve_devlog.repository.ProjectRepository;
import com.resolve.devlog.resolve_devlog.repository.UserRepository;
import com.resolve.devlog.resolve_devlog.service.ProjectService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ProjectDto createProject(ProjectDto projectDto, Long userId) {
        
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Project project = ProjectMapper.mapToProject(projectDto, user);
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());

        Project saved = projectRepository.save(project);
        return ProjectMapper.mapToProjectDto(saved);
    }

    @Override
    public ProjectDto updateProject(Long id, ProjectDto projectDto) {
        
        Project project = projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project now found"));

        project.setName(projectDto.getName());
        projectDto.setUpdatedAt(LocalDateTime.now());

        Project saved = projectRepository.save(project);
        return ProjectMapper.mapToProjectDto(saved);
    }   

    @Override
    public List<ProjectDto> getProjects(Long id) {
        
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return projectRepository.findByCreatedBy(user).stream().map((project) -> ProjectMapper.mapToProjectDto(project)).collect(Collectors.toList());
    }

    @Override
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        projectRepository.deleteById(id);
    }

    @Override
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return ProjectMapper.mapToProjectDto(project);
    }
}
