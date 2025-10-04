package com.resolve.devlog.resolve_devlog.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.resolve.devlog.resolve_devlog.dto.DevlogsDto;

public interface DevlogsService {
    DevlogsDto addDevlog(DevlogsDto devlogsDto);
    Page<DevlogsDto> getByProject(Long projectId, int page, int size);
    DevlogsDto getByProjectAndUser(Long projectId, Long userId);
    void deleteDevlog(Long id);
}
