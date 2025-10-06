package com.resolve.devlog.resolve_devlog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.resolve.devlog.resolve_devlog.dto.BugsDto;
import com.resolve.devlog.resolve_devlog.service.BugsService;

@CrossOrigin("*")
@Controller
@RequestMapping("/api/bugs")
public class BugsController {

    @Autowired  
    private BugsService bugsService;

    @PostMapping("/report")
    public ResponseEntity<?> reportBug(@RequestBody BugsDto bugsDto) {
        try {
            BugsDto reportedBug = bugsService.reportBug(bugsDto);
            return new ResponseEntity<>(reportedBug, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
