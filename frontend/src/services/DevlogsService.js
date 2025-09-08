import axios from "axios";

export const getByProject = (projectId) => axios.get(`http://localhost:8080/api/devlogs/${projectId}`); 