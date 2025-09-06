package com.resolve.devlog.resolve_devlog.service;

import com.resolve.devlog.resolve_devlog.dto.DevlogsDto;

public interface DevlogsService {
    DevlogsDto addDevlog(DevlogsDto devlogsDto);
    DevlogsDto getByProject(Long projectId);
    DevlogsDto getByProjectAndUser(Long projectId, Long userId);
    DevlogsDto deleteDevlog(Long id);
}
