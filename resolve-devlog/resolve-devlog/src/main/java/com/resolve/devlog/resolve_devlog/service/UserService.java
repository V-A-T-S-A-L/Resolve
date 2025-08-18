package com.resolve.devlog.resolve_devlog.service;

import com.resolve.devlog.resolve_devlog.dto.LoginRequest;
import com.resolve.devlog.resolve_devlog.dto.RegisterRequest;
import com.resolve.devlog.resolve_devlog.dto.UserDto;
import com.resolve.devlog.resolve_devlog.entity.User;

public interface UserService {

    UserDto registerUser(RegisterRequest registerRequest);
    UserDto loginUser(LoginRequest loginRequest);
    UserDto getUserById(Long id);
    UserDto getUserByEmail(String email);
    boolean existsByEmail(String email);
}
