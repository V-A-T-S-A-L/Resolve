package com.resolve.devlog.resolve_devlog.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resolve.devlog.resolve_devlog.dto.JoinRequestDto;
import com.resolve.devlog.resolve_devlog.entity.JoinRequest;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.User;
import com.resolve.devlog.resolve_devlog.exception.ResourceNotFoundException;
import com.resolve.devlog.resolve_devlog.mapper.JoinRequestMapper;
import com.resolve.devlog.resolve_devlog.repository.JoinRequestRepository;
import com.resolve.devlog.resolve_devlog.repository.ProjectRepository;
import com.resolve.devlog.resolve_devlog.repository.UserRepository;
import com.resolve.devlog.resolve_devlog.service.JoinRequestService;

@Service
public class JoinRequestServiceImpl implements JoinRequestService{

    @Autowired
    private JoinRequestRepository joinRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public JoinRequestDto addRequest(Long projectId, String senderEmail, String receiverEmail) {
        User sender = userRepository.findByEmail(senderEmail).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        User receiver = userRepository.findByEmail(receiverEmail).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        joinRequestRepository.findBySenderAndReceiverAndProject(sender, receiver, project).ifPresent(j -> {
            throw new RuntimeException("Request already sent");
        });

        JoinRequest joinRequest = new JoinRequest();
        joinRequest.setSender(sender);
        joinRequest.setReceiver(receiver);
        joinRequest.setProject(project);
        joinRequest.setCreatedAt(LocalDateTime.now());

        JoinRequest saved = joinRequestRepository.save(joinRequest);
        return JoinRequestMapper.mapToJoinRequestDto(saved);
    }

    @Override
    public List<JoinRequestDto> getRequestsByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return joinRequestRepository.findByProject(project).stream().map((j) -> JoinRequestMapper.mapToJoinRequestDto(j)).collect(Collectors.toList());
    }

    @Override
    public List<JoinRequestDto> getRequestsByReceiverEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return joinRequestRepository.findByReceiver(user).stream().map((j) -> JoinRequestMapper.mapToJoinRequestDto(j)).collect(Collectors.toList());
    }

    @Override
    public void cancelRequest(Long requestId) {

        JoinRequest request = joinRequestRepository.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request Not Found"));
        joinRequestRepository.delete(request);
    }

}
