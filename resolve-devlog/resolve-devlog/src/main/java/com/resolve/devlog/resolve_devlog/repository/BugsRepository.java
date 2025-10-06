package com.resolve.devlog.resolve_devlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resolve.devlog.resolve_devlog.entity.Bugs;

public interface BugsRepository extends JpaRepository<Bugs, Long> {
    
}
