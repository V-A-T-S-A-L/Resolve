package com.resolve.devlog.resolve_devlog.service;

import org.springframework.data.domain.Page;

import com.resolve.devlog.resolve_devlog.dto.BugsDto;

public interface BugsService {
    BugsDto reportBug(BugsDto bugsDto);
    Page<BugsDto> getByProject(Long projectId, int page, int size);
    void deleteBug(Long projectId);
}
