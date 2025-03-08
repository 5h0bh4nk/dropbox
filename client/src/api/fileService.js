import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/files/upload`, formData);
};

export const getFiles = () => axios.get(`${API_URL}/files/list`);

export const downloadFile = (key) => axios.get(`${API_URL}/files/download/${key}`, {
  responseType: "blob", 
});