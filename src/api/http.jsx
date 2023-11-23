import api from './axios';

// 게시판 정보 가져오는 함수
export async function fetchEvents(endpoint) {
  const response = await api.get(endpoint, { withCredentials: true });

  if (response.status !== 200) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const events = response.data;

  return events;
}

// 작성된 게시판 텍스트 정보를 보내는 함수
export async function createNewEvent(eventData) {
  const response = await api.post(
    '/post',
    eventData,
    { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
  );

  if (response.status !== 200) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = response.data;
    throw error;
  }

  const event = response.data;

  return event;
}
