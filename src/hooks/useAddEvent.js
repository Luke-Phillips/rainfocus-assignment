import { useState } from 'react';
import axios from 'axios';

const useAddEvent = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addEvent = async (data) => {
    setIsAdding(true);
    try {
      await axios.post('https://rf-json-server.herokuapp.com/events/', {
        ...data,
        isActive: true,
        createdOn: Date.now,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsAdding(false);
    }
  };

  return [addEvent, isAdding];
};

export default useAddEvent;
