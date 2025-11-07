package com.novatech.backend.controller;

import com.novatech.backend.dto.ProjectDTO;
import com.novatech.backend.dto.ProjectResponseDTO;
import com.novatech.backend.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication; 
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects") 
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(
            @Valid @RequestBody ProjectDTO projectDTO,
            Authentication authentication 
    ) {
        String managerEmail = authentication.getName(); 
        
        ProjectResponseDTO createdProject = projectService.createProject(projectDTO, managerEmail);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        List<ProjectResponseDTO> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable("id") Long projectId) {
        ProjectResponseDTO project = projectService.getProjectById(projectId);
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(
            @PathVariable("id") Long projectId,
            @Valid @RequestBody ProjectDTO projectDTO,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        ProjectResponseDTO updatedProject = projectService.updateProject(projectId, projectDTO, userEmail);
        return ResponseEntity.ok(updatedProject);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable("id") Long projectId,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        projectService.deleteProject(projectId, userEmail);
        return ResponseEntity.noContent().build();
    }
}
