package com.resolve.devlog.resolve_devlog.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resolve.devlog.resolve_devlog.entity.JoinRequest;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.User;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {
    List<JoinRequest> findByProject(Project project);
    List<JoinRequest> findByReceiver(User user);
    Optional<JoinRequest> findBySenderAndReceiverAndProject(User sender, User receiver, Project project);
}
