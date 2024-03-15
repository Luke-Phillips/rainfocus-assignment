import { useState } from 'react';
import axios from 'axios';

const useAddEvent = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  const addEvent = async (data) => {
    setIsAdding(true);
    try {
      await axios.post('https://rf-json-server.herokuapp.com/events/', {
        ...data,
        isActive: true,
        createdOn: Date.now,
      });
      setError(null);
    } catch (e) {
      setError('error adding event');
    } finally {
      setIsAdding(false);
    }
  };

  return [addEvent, isAdding, error];
};

export default useAddEvent;
