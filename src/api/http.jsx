import api from "./axios"

export async function fetchEvents () {
  const response = await api.get('/post', { withCredentials: true });
  
  if (response.status !== 200) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = response;
    throw error;
  }
  
  const events = response.data;

  return events;
}