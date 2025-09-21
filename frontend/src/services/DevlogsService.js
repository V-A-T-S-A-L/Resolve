import axios from "axios";

export const createDevlog = (body) => axios.post('http://localhost:8080/api/devlogs/create', body);

export const getByProject = (projectId, page, size) => axios.get(`http://localhost:8080/api/devlogs/${projectId}?page=${page}&size=${size}`);