import axios from "axios";

export const receivedReqs = (receiver_email) => axios.get(`http://localhost:8080/api/join-request/received/${receiver_email}`);