package com.resolve.devlog.resolve_devlog.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.resolve.devlog.resolve_devlog.entity.Devlogs;
import com.resolve.devlog.resolve_devlog.entity.Project;

public interface DevlogsRepository extends JpaRepository<Devlogs, Long> {
    Page<Devlogs> findByProject(Project project, Pageable pageable);
}
