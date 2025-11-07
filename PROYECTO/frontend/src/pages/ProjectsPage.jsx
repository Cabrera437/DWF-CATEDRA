import React, { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import './ProjectsPage.css'; 

function ProjectsPage() {
  const [projects, setProjects] = useState([]); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchProjects(); 
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAllProjects();
      setProjects(response.data);
      setError('');
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
      handleApiError(err, 'cargar');
    }
  };
  const handleCreateProject = async (e) => {
    e.preventDefault(); 
    setFormError('');
    setSuccess('');

    if (!newProjectName) {
      setFormError('El nombre es obligatorio.');
      return;
    }

    try {
      const projectData = { 
        name: newProjectName, 
        description: newProjectDescription 
      };
      await projectService.createProject(projectData);

      setSuccess('¡Proyecto creado con éxito!');
      setNewProjectName('');
      setNewProjectDescription('');
      
      fetchProjects(); 

    } catch (err) {
      console.error("Error al crear proyecto:", err);
      handleApiError(err, 'crear');
    }
  };
  const handleDeleteProject = async (projectId) => {

    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      try {
        await projectService.deleteProject(projectId);
        setSuccess('Proyecto eliminado con éxito.');
        fetchProjects(); 
      } catch (err) {
        console.error("Error al eliminar proyecto:", err);
        handleApiError(err, 'eliminar');
      }
    }
  };
  const handleApiError = (err, action) => {
    if (err.response) {
      if (err.response.status === 403) {
        setError(`Acceso denegado. No tienes permiso para ${action} este proyecto.`);
      } else if (err.response.status === 401) {
        setError('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
      } else {
        setError(`Error al ${action} el proyecto: ${err.response.data.message || 'Error del servidor'}`);
      }
    } else {
      setError('Error de red o el servidor no responde.');
    }
  };
  return (
    <div className="projects-container">
      <h2>Gestión de Proyectos</h2>

      {/* --- Formulario de Creación --- */}
      <form onSubmit={handleCreateProject} className="project-form">
        <h3>Crear Nuevo Proyecto</h3>
        {formError && <div className="error-message">{formError}</div>}
        <div className="form-group">
          <label htmlFor="projectName">Nombre del Proyecto</label>
          <input
            type="text"
            id="projectName"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectDesc">Descripción</label>
          <textarea
            id="projectDesc"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Proyecto</button>
      </form>

      {/* Mensajes globales de éxito o error */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* --- Lista de Proyectos --- */}
      <hr />
      <h3>Proyectos Existentes</h3>
      <div className="project-list">
        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <small>Manager: {project.manager.name} {project.manager.lastname}</small>
              <button 
                onClick={() => handleDeleteProject(project.id)} 
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay proyectos para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;