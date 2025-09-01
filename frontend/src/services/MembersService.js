import axios from "axios";

export const AddMember = (body) => axios.post('http://localhost:8080/api/members/add', body);

export const GetProjectMembers = (projectId) => axios.get(`http://localhost:8080/api/members/${projectId}`);

export const checkMember = (projectId, userId) => axios.get(`http://localhost:8080/api/members/check-member/${projectId}/${userId}`);

export const getProjectsWhereMember = (userId) => axios.get(`http://localhost:8080/api/members/projects/${userId}`);