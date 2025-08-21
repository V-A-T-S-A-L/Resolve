package com.resolve.devlog.resolve_devlog.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JoinRequestDto {

    private Long id;
    private String senderEmail;
    private String receiverEmail;
    private Long projectId;
    private LocalDateTime createdAt;
}
