package com.resolve.devlog.resolve_devlog.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.resolve.devlog.resolve_devlog.dto.DevlogsDto;
import com.resolve.devlog.resolve_devlog.entity.Devlogs;
import com.resolve.devlog.resolve_devlog.entity.Project;
import com.resolve.devlog.resolve_devlog.entity.User;
import com.resolve.devlog.resolve_devlog.exception.ResourceNotFoundException;
import com.resolve.devlog.resolve_devlog.mapper.DevlogsMapper;
import com.resolve.devlog.resolve_devlog.repository.DevlogsRepository;
import com.resolve.devlog.resolve_devlog.repository.ProjectMembersRepository;
import com.resolve.devlog.resolve_devlog.repository.ProjectRepository;
import com.resolve.devlog.resolve_devlog.repository.UserRepository;
import com.resolve.devlog.resolve_devlog.service.DevlogsService;

import jakarta.annotation.Resource;

@Service
public class DevlogsServiceImpl implements DevlogsService{

    @Autowired
    private DevlogsRepository devlogsRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectMembersRepository projectMembersRepository;

    @Override
    public DevlogsDto addDevlog(DevlogsDto devlogsDto) {
        User user = userRepository.findById(devlogsDto.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Project project = projectRepository.findById(devlogsDto.getProjectId()).orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        boolean isMember = projectMembersRepository.existsByProjectAndUser(project, user);
        if(!isMember) {
            throw new RuntimeException("User is not a member of the project");
        }

        Devlogs devlogs = new Devlogs();
        devlogs.setUser(user);
        devlogs.setProject(project);
        devlogs.setTitle(devlogsDto.getTitle());
        devlogs.setContent(devlogsDto.getContent());
        devlogs.setCreatedAt(LocalDateTime.now());
        devlogs.setUpdatedAt(LocalDateTime.now());

        Devlogs saved = devlogsRepository.save(devlogs);
        return DevlogsMapper.mapToDevlogsDto(saved);
    }

    @Override
    public Page<DevlogsDto> getByProject(Long projectId, int page, int size) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        Page<Devlogs> devlogs = devlogsRepository.findByProject(project, PageRequest.of(page, size, Sort.by("createdAt").descending()));
        return devlogs.map(DevlogsMapper::mapToDevlogsDto);
    }

    @Override
    public DevlogsDto getByProjectAndUser(Long projectId, Long userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getByProjectAndUser'");
    }

    @Override
    public DevlogsDto deleteDevlog(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteDevlog'");
    }

}
