import React from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export default function Home() {
  const axiosPrivate = useAxiosPrivate();

  const fetchEvents = async () => {
    const response = await axiosPrivate.get('/post');

    if (response.status !== 200) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = response;
      throw error;
    }

    const events = response.data;
    console.log(events);

    return events;
  };

  return (
    <div>
      Home
      <button onClick={fetchEvents}>클릭</button>
    </div>
  );
}
