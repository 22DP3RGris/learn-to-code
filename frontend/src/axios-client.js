import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response; 
    },
    (error) => {
        console.error(error); 
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                window.location.href = '/login';
            } else if (status === 500) {
                alert('Servera kļūda. Lūdzu, mēģiniet vēlreiz.');
            } else if (status === 403) {
                alert('Jums nav tiesību veikt šo darbību.');
            }
        }
        throw error;
    }
);

export default axiosClient;