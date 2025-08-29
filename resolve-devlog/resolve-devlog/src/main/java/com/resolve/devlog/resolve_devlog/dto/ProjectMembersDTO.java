package com.resolve.devlog.resolve_devlog.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectMembersDTO {

    private Long id;
    private Long projectId;
    private Long userId;
    private String userName;
    private String email;
    private String role;
    private LocalDateTime joinedAt;
}
