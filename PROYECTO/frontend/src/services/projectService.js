import api from './api'; 

const createProject = (projectData) => {
  return api.post('/projects', projectData);
};
const getAllProjects = () => {
  return api.get('/projects');
};

const deleteProject = (id) => {
  return api.delete(`/projects/${id}`);
};

export default {
  createProject,
  getAllProjects,
  deleteProject,
};