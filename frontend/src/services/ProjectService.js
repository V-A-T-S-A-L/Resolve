import axios from "axios";

export const createProjectService = (id, body) => axios.post(`http://localhost:8080/api/project/create/${id}`, body);

export const getProjectsByUserService = (id) => axios.get(`http://localhost:8080/api/project/user/${id}`);