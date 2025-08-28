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
            joinRequest.getSender().getName(),
            joinRequest.getReceiver().getEmail(),
            joinRequest.getReceiver().getName(),
            joinRequest.getProject().getId(),
            joinRequest.getProject().getName(),
            joinRequest.getCreatedAt()
        );
    }
}
