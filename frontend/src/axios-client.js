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
      return response; // Atgriež derīgas atbildes
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/login';
      } else if (error.response.status === 500) {
        alert('Servera kļūda. Lūdzu, mēģiniet vēlreiz.');
      } else if (error.response.status === 403) {
        alert('Jums nav tiesību veikt šo darbību.');
      }
      throw error; // Vienmēr atkal izmet kļūdu, lai to varētu izsekot
    }
  );

export default axiosClient;