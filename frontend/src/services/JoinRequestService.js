import axios from "axios";

export const receivedReqs = (receiver_email) => axios.get(`http://localhost:8080/api/join-request/received/${receiver_email}`);

export const deleteReq = (id) => axios.delete(`http://localhost:8080/api/join-request/delete/${id}`);

export const sendReq = (body) => axios.post('http://localhost:8080/api/join-request/send', body);