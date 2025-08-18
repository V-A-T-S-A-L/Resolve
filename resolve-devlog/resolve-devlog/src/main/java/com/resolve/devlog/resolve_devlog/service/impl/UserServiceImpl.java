package com.resolve.devlog.resolve_devlog.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.resolve.devlog.resolve_devlog.dto.LoginRequest;
import com.resolve.devlog.resolve_devlog.dto.RegisterRequest;
import com.resolve.devlog.resolve_devlog.dto.UserDto;
import com.resolve.devlog.resolve_devlog.entity.User;
import com.resolve.devlog.resolve_devlog.exception.InvalidCredentialsException;
import com.resolve.devlog.resolve_devlog.exception.ResourceNotFoundException;
import com.resolve.devlog.resolve_devlog.exception.UserAlreadyExistsException;
import com.resolve.devlog.resolve_devlog.mapper.UserMapper;
import com.resolve.devlog.resolve_devlog.repository.UserRepository;
import com.resolve.devlog.resolve_devlog.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(RegisterRequest registerRequest) {

        if(userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException("User already exists");
        }

        User user = User.builder()
            .name(registerRequest.getName())
            .email(registerRequest.getEmail())
            .password(passwordEncoder.encode(registerRequest.getPassword()))
            .createdAt(LocalDateTime.now())
            .build();

        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto loginUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if(userOptional.isEmpty()) {
            throw new ResourceNotFoundException("User does not exist");
        }

        User user = userOptional.get();

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid Credentials");
        }

        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto getUserById(Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto getUserByEmail(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
