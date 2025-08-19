package com.resolve.devlog.resolve_devlog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

import com.resolve.devlog.resolve_devlog.dto.ProjectDto;
import com.resolve.devlog.resolve_devlog.service.ProjectService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    
    @PostMapping("/create/{id}")
    public ResponseEntity<?> createProject(@RequestBody ProjectDto projectDto, @PathVariable("id") Long userId) {
        try {
            ProjectDto savedProjectDto = projectService.createProject(projectDto, userId);
            return new ResponseEntity<>(savedProjectDto, HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getprojects(@PathVariable("id") Long id) {
        try {
            List<ProjectDto> projects = projectService.getProjects(id);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProject(@PathVariable("id") Long id, @RequestBody ProjectDto projectDto) {
        try {
            ProjectDto newProjectDto = projectService.updateProject(id, projectDto);
            return ResponseEntity.ok(newProjectDto);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getProjectById(@PathVariable("id") Long id) {
        try {
            ProjectDto newProjectDto = projectService.getProjectById(id);
            return ResponseEntity.ok(newProjectDto);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project Deleted!");
    }
}
