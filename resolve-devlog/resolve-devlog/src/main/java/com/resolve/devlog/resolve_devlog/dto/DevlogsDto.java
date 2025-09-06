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
public class DevlogsDto {
    private Long id;
    private Long projectId;
    private Long userId;
    private String userName;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
