package com.resolve.devlog.resolve_devlog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resolve.devlog.resolve_devlog.dto.DevlogsDto;
import com.resolve.devlog.resolve_devlog.entity.Devlogs;
import com.resolve.devlog.resolve_devlog.entity.Project;

public interface DevlogsRepository extends JpaRepository<Devlogs, Long> {
    List<DevlogsDto> findByProject(Project project);
}
