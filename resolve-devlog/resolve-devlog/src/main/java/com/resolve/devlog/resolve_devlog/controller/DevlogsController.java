package com.resolve.devlog.resolve_devlog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.resolve.devlog.resolve_devlog.dto.DevlogsDto;
import com.resolve.devlog.resolve_devlog.service.DevlogsService;

@CrossOrigin("*")
@Controller
@RequestMapping("/api/devlogs")
public class DevlogsController {

    @Autowired
    private DevlogsService devlogsService;

    @PostMapping("/create")
    public ResponseEntity<?> addDevlog(@RequestBody DevlogsDto devlogsDto) {
        try {
            DevlogsDto saved = devlogsService.addDevlog(devlogsDto);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
