package com.resolve.devlog.resolve_devlog.mapper;

import java.time.LocalDateTime;

import com.resolve.devlog.resolve_devlog.dto.UserDto;
import com.resolve.devlog.resolve_devlog.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPassword()
        );
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
            userDto.getId(),
            userDto.getName(),
            userDto.getEmail(),
            userDto.getPassword(),
            LocalDateTime.now(),
            null
        );
    }
}
