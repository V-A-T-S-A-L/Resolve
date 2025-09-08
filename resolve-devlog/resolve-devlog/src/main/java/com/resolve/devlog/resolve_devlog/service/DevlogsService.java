package com.resolve.devlog.resolve_devlog.service;

import java.util.List;

import com.resolve.devlog.resolve_devlog.dto.DevlogsDto;

public interface DevlogsService {
    DevlogsDto addDevlog(DevlogsDto devlogsDto);
    List<DevlogsDto> getByProject(Long projectId);
    DevlogsDto getByProjectAndUser(Long projectId, Long userId);
    DevlogsDto deleteDevlog(Long id);
}
