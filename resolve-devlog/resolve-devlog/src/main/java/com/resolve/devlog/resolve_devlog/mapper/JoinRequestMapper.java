package com.resolve.devlog.resolve_devlog.mapper;

import org.springframework.stereotype.Component;

import com.resolve.devlog.resolve_devlog.dto.JoinRequestDto;
import com.resolve.devlog.resolve_devlog.entity.JoinRequest;

@Component
public class JoinRequestMapper {

    public static JoinRequestDto mapToJoinRequestDto(JoinRequest joinRequest) {
        return new JoinRequestDto(
            joinRequest.getId(),
            joinRequest.getSender().getEmail(),
            joinRequest.getReceiver().getEmail(),
            joinRequest.getProject().getId(),
            joinRequest.getCreatedAt()
        );
    }
}
