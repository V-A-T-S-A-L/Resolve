package com.resolve.devlog.resolve_devlog.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.ProjectMembers;
import com.resolve.devlog.resolve_devlog.entity.User;

public interface ProjectMembersRepository extends JpaRepository<ProjectMembers, Long> {
    List<ProjectMembers> findByProject(Project project);
    List<ProjectMembers> findByUser(User user);
    Optional<ProjectMembers> findByProjectAndUser(Project project, User user);
    boolean existsByProjectAndUser(Project project, User user);
    List<ProjectMembers> findTop3ByUserOrderByJoinedAtDesc(User user);

    @Query("SELECT pm.role FROM ProjectMembers pm WHERE pm.project = :project AND pm.user = :user")
    String findRoleByProjectAndUser(Project project, User user);
}
