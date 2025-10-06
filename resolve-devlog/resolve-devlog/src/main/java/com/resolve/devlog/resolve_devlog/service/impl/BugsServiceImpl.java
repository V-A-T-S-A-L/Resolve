package com.resolve.devlog.resolve_devlog.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.resolve.devlog.resolve_devlog.dto.BugsDto;
import com.resolve.devlog.resolve_devlog.entity.Bugs;
import com.resolve.devlog.resolve_devlog.entity.Devlogs;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.User;
import com.resolve.devlog.resolve_devlog.exception.ResourceNotFoundException;
import com.resolve.devlog.resolve_devlog.mapper.BugsMapper;
import com.resolve.devlog.resolve_devlog.mapper.DevlogsMapper;
import com.resolve.devlog.resolve_devlog.repository.BugsRepository;
import com.resolve.devlog.resolve_devlog.repository.ProjectMembersRepository;
import com.resolve.devlog.resolve_devlog.repository.ProjectRepository;
import com.resolve.devlog.resolve_devlog.repository.UserRepository;
import com.resolve.devlog.resolve_devlog.service.BugsService;

@Service
public class BugsServiceImpl implements BugsService {

    @Autowired
    private BugsRepository bugsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMembersRepository projectMembersRepository;

    @Override
    public BugsDto reportBug(BugsDto bugsDto) {
        User user = userRepository.findById(bugsDto.getReportedById()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Project project = projectRepository.findById(bugsDto.getProjectId()).orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        boolean isMember = projectMembersRepository.existsByProjectAndUser(project, user);
        if (!isMember) {
            throw new RuntimeException("User is not a member of the project");
        }

        Bugs bug = new Bugs();
        bug.setProject(project);
        bug.setReportedBy(user);
        
        if (bugsDto.getAssignedToId() == null) {
            bug.setAssignedTo(null);
        } else {
            User user2 = userRepository.findById(bugsDto.getAssignedToId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
            boolean isMember2 = projectMembersRepository.existsByProjectAndUser(project, user2);
            if (!isMember2) {
                throw new RuntimeException("User is not a member of the project");
            }
            bug.setAssignedTo(userRepository.findById(bugsDto.getAssignedToId()).orElseThrow(() -> new ResourceNotFoundException("Assigned user not found")));
        }
        
        bug.setTitle(bugsDto.getTitle());
        bug.setDescription(bugsDto.getDescription());
        bug.setStatus(bugsDto.getStatus());
        bug.setPriority(bugsDto.getPriority());
        bug.setCreatedAt(LocalDateTime.now());
        bug.setUpdatedAt(LocalDateTime.now());
        bug.setClosedAt(null);
        Bugs savedBug = bugsRepository.save(bug);
        return BugsMapper.mapToBugsDto(savedBug);
    }

    @Override
    public Page<BugsDto> getByProject(Long projectId, int page, int size) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        Page<Bugs> bugs = bugsRepository.findByProject(project, PageRequest.of(page, size, Sort.by("createdAt").descending()));
        return bugs.map(BugsMapper::mapToBugsDto);
    }
}
