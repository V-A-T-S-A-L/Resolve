package com.resolve.devlog.resolve_devlog.service;

import java.util.List;

import com.resolve.devlog.resolve_devlog.dto.JoinRequestDto;

public interface JoinRequestService {

    JoinRequestDto addRequest(Long projectId, String senderEmail, String receiverEmail);
    List<JoinRequestDto> getRequestsByProjectId(Long projectId);
    List<JoinRequestDto> getRequestsByReceiverEmail(String email);
    void cancelRequest(Long requestId);
}
