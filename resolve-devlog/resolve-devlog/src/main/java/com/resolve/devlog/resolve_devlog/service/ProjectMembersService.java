package com.resolve.devlog.resolve_devlog.service;

import java.util.List;

import com.resolve.devlog.resolve_devlog.dto.ProjectMembersDTO;

public interface ProjectMembersService {

    ProjectMembersDTO addMember(Long projectId, Long userId, String role);
    List<ProjectMembersDTO> getMembersByProject(Long projectId);
    List<ProjectMembersDTO> getMembersByUser(Long userId);
    ProjectMembersDTO updateMember(Long id, ProjectMembersDTO projectMembersDTO);
    void removeMember(Long projectId, Long userId);
    boolean checkMember(Long projectId, Long userId);
}
