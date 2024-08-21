import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000'; // Update with your API base URL

export const apiCall = async <T>(
  endpoint: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      ...config,
    });
    return response.data;
  } catch (error) {
    // Handle error (e.g., display a notification, log to a service)
    console.error('API call error:', error);
    throw error;
  }
};
