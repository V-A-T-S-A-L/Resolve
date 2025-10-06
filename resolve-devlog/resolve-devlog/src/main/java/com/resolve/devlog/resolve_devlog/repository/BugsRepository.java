package com.resolve.devlog.resolve_devlog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.resolve.devlog.resolve_devlog.entity.Bugs;
import com.resolve.devlog.resolve_devlog.entity.Project;

public interface BugsRepository extends JpaRepository<Bugs, Long> {
    Page<Bugs> findByProject(Project project, Pageable pageable);
}
