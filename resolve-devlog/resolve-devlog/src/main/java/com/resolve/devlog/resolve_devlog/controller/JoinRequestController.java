package com.resolve.devlog.resolve_devlog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resolve.devlog.resolve_devlog.dto.JoinRequestDto;
import com.resolve.devlog.resolve_devlog.service.JoinRequestService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/join-request")
public class JoinRequestController {

    @Autowired
    private JoinRequestService joinRequestService;

    @PostMapping("/send")
    public ResponseEntity<?> addRequest(@RequestBody JoinRequestDto joinRequestDto) {
        try {
            JoinRequestDto saved = joinRequestService.addRequest(joinRequestDto.getProjectId(), joinRequestDto.getSenderEmail(), joinRequestDto.getReceiverEmail());
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/sent/{projectId}")
    public ResponseEntity<?> getRequestsByProjectId(@PathVariable("projectId") Long projectId) {
        try {
            List<JoinRequestDto> requests = joinRequestService.getRequestsByProjectId(projectId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/received/{receiverEmail}")
    public ResponseEntity<?> getRequestsByReceiverEmail(@PathVariable("receiverEmail") String receiverEmail) {
        try {
            List<JoinRequestDto> requests = joinRequestService.getRequestsByReceiverEmail(receiverEmail);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> cancelRequest(@PathVariable("id") Long id) {
        try {
            joinRequestService.cancelRequest(id);
            return ResponseEntity.ok("Request Cancelled!");
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
