package com.resolve.devlog.resolve_devlog.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resolve.devlog.resolve_devlog.dto.ProjectMembersDTO;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.ProjectMembers;
import com.resolve.devlog.resolve_devlog.entity.User;
import com.resolve.devlog.resolve_devlog.exception.ResourceNotFoundException;
import com.resolve.devlog.resolve_devlog.mapper.ProjectMembersMapper;
import com.resolve.devlog.resolve_devlog.repository.ProjectMembersRepository;
import com.resolve.devlog.resolve_devlog.repository.ProjectRepository;
import com.resolve.devlog.resolve_devlog.repository.UserRepository;
import com.resolve.devlog.resolve_devlog.service.EmailService;
import com.resolve.devlog.resolve_devlog.service.ProjectMembersService;

@Service
public class ProjectMembersServiceImpl implements ProjectMembersService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectMembersRepository projectMembersRepository;

    @Override
    public ProjectMembersDTO addMember(Long projectId, Long userId, String role) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        
        projectMembersRepository.findByProjectAndUser(project, user).ifPresent(m -> {throw new RuntimeException("User already a member");});

        ProjectMembers projectMembers = new ProjectMembers();
        projectMembers.setUser(user);
        projectMembers.setProject(project);
        projectMembers.setJoinedAt(LocalDateTime.now());
        projectMembers.setRole(role);

        ProjectMembers saved = (ProjectMembers) projectMembersRepository.save(projectMembers);
        return ProjectMembersMapper.mapToProjectMembersDTO(saved);
    }

    @Override
    public List<ProjectMembersDTO> getMembersByProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return projectMembersRepository.findByProject(project).stream().map((p) -> ProjectMembersMapper.mapToProjectMembersDTO(p)).collect(Collectors.toList());
    }

    @Override
    public List<ProjectMembersDTO> getMembersByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return projectMembersRepository.findByUser(user).stream().map((p) -> ProjectMembersMapper.mapToProjectMembersDTO(p)).collect(Collectors.toList());
    }

    @Override
    public List<ProjectMembersDTO> getRecentProjects(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return projectMembersRepository.findTop3ByUserOrderByJoinedAtDesc(user).stream().map((p) -> ProjectMembersMapper.mapToProjectMembersDTO(p)).collect(Collectors.toList());
    } 

    @Override
    public void removeMember(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        ProjectMembers members = projectMembersRepository.findByProjectAndUser(project, user).orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        projectMembersRepository.delete(members);
    }

    @Override
    public ProjectMembersDTO updateMember(Long id, ProjectMembersDTO projectMembersDTO) {
        ProjectMembers projectMembers = projectMembersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        projectMembers.setRole(projectMembersDTO.getRole());

        ProjectMembers saved = projectMembersRepository.save(projectMembers);
        return ProjectMembersMapper.mapToProjectMembersDTO(saved);
    }

    @Override
    public boolean checkMember(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return projectMembersRepository.existsByProjectAndUser(project, user);
    }

    @Override
    public String getRole(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return projectMembersRepository.findRoleByProjectAndUser(project, user);
    }
}
