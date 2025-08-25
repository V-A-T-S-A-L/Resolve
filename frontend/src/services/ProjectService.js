import axios from "axios";

export const createProjectService = (id, body) => axios.post(`http://localhost:8080/api/project/create/${id}`, body);