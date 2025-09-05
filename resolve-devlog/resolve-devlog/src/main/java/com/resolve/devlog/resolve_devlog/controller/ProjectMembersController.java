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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resolve.devlog.resolve_devlog.dto.ProjectMembersDTO;
import com.resolve.devlog.resolve_devlog.service.ProjectMembersService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/members")
public class ProjectMembersController {

    @Autowired
    private ProjectMembersService projectMembersService;

    @PostMapping("/add")
    public ResponseEntity<?> addMember(@RequestBody ProjectMembersDTO projectMembersDTO) {
        try {
            ProjectMembersDTO saved = projectMembersService.addMember(projectMembersDTO.getProjectId(), projectMembersDTO.getUserId(), projectMembersDTO.getRole());
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    } 

    @GetMapping("{projectId}")
    public ResponseEntity<?> getMembersByProject(@PathVariable("projectId") Long projectId) {
        try {
            List<ProjectMembersDTO> members = projectMembersService.getMembersByProject(projectId);
            return ResponseEntity.ok(members);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/projects/{userId}")
    public ResponseEntity<?> getProjectsByUser(@PathVariable("userId") Long userId) {
        try {
            List<ProjectMembersDTO> projects = projectMembersService.getMembersByUser(userId);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/check-member/{projectId}/{userId}")
    public ResponseEntity<?> checkMember(@PathVariable("projectId") Long projectId, @PathVariable("userId") Long userId) {
        try {
            boolean exists = projectMembersService.checkMember(projectId, userId);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-role/{projectId}/{userId}")
    public ResponseEntity<?> getRole(@PathVariable("projectId") Long projectId, @PathVariable("userId") Long userId) {
        try {
            String role = projectMembersService.getRole(projectId, userId);
            return ResponseEntity.ok(role);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-recent-projects/{userId}")
    public ResponseEntity<?> getRecentProjects(@PathVariable("userId") Long userId) {
        try {
            List<ProjectMembersDTO> recent = projectMembersService.getRecentProjects(userId);
            return ResponseEntity.ok(recent);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{memberId}")
    public ResponseEntity<?> updateMember(@PathVariable("memberId") Long memberId, @RequestBody ProjectMembersDTO projectMembersDTO) {
        try {
            ProjectMembersDTO newProjectMembersDTO = projectMembersService.updateMember(memberId, projectMembersDTO);
            return ResponseEntity.ok(newProjectMembersDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{projectId}/{userId}")
    public ResponseEntity<?> deleteMember(@PathVariable("projectId") Long projectId, @PathVariable("userId") Long userID) {
        projectMembersService.removeMember(projectId, userID);
        return ResponseEntity.ok("Member Removed!");
    }
}
