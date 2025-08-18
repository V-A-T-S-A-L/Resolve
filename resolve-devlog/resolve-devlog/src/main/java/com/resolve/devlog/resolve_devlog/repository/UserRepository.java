package com.resolve.devlog.resolve_devlog.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resolve.devlog.resolve_devlog.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
