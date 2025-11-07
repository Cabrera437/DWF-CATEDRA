package com.novatech.backend.service;

import com.novatech.backend.dto.ProjectDTO;
import com.novatech.backend.dto.ProjectResponseDTO;
import java.util.List;
public interface ProjectService {

    ProjectResponseDTO createProject(ProjectDTO projectDTO, String managerEmail);

    List<ProjectResponseDTO> getAllProjects();

    List<ProjectResponseDTO> getProjectsByManager(Long managerId);
    
    ProjectResponseDTO getProjectById(Long projectId);

    ProjectResponseDTO updateProject(Long projectId, ProjectDTO projectDTO, String userEmail);

    void deleteProject(Long projectId, String userEmail);
}