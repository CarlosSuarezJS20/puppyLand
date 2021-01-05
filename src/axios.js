import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://api.thedogapi.com/v1/',
});

export default axiosInstance;
