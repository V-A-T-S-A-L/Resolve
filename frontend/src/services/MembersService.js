import axios from "axios";

export const AddMember = (body) => axios.post('http://localhost:8080/api/members/add', body);

export const GetProjectMembers = (projectId) => axios.get(`http://localhost:8080/api/members/${projectId}`);