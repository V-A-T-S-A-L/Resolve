package com.resolve.devlog.resolve_devlog.mapper;

import org.springframework.stereotype.Component;

import com.resolve.devlog.resolve_devlog.dto.DevlogsDto;
import com.resolve.devlog.resolve_devlog.entity.Devlogs;

@Component
public class DevlogsMapper {

    public static DevlogsDto mapToDevlogsDto(Devlogs devlogs) {
        return new DevlogsDto(
            devlogs.getId(),
            devlogs.getUser().getId(),
            devlogs.getProject().getId(),
            devlogs.getUser().getName(),
            devlogs.getTitle(),
            devlogs.getContent(),
            devlogs.getCreatedAt()
        );
    }
}
