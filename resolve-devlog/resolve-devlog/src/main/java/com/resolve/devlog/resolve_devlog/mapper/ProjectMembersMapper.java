package com.resolve.devlog.resolve_devlog.mapper;

import org.springframework.stereotype.Component;

import com.resolve.devlog.resolve_devlog.dto.ProjectMembersDTO;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.ProjectMembers;
import com.resolve.devlog.resolve_devlog.entity.User;

@Component
public class ProjectMembersMapper {

    public static ProjectMembersDTO mapToProjectMembersDTO(ProjectMembers projectMembers) {
        return new ProjectMembersDTO(
            projectMembers.getId(),
            projectMembers.getProject().getId(),
            projectMembers.getProject().getName(),
            projectMembers.getProject().getDescription(),
            projectMembers.getUser().getId(),
            projectMembers.getUser().getName(),
            projectMembers.getUser().getEmail(),
            projectMembers.getRole(),
            projectMembers.getJoinedAt()
        );
    }

    public static ProjectMembers mapToProjectMembers(ProjectMembersDTO projectMembersDTO, User user, Project project) {
        return new ProjectMembers(
            projectMembersDTO.getId(),
            project,
            user,
            projectMembersDTO.getRole(),
            projectMembersDTO.getJoinedAt()
        );
    }
}
