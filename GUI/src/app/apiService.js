// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5058'; // Update this to your backend's base URL

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('videoFile', file);

    try {
        const response = await apiClient.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Video upload error:', error);
        throw error;
    }
};

export default apiClient;
