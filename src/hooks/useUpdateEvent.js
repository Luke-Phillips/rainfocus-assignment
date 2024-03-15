import { useState } from 'react';
import axios from 'axios';

const useUpdateEvent = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateEvent = async (id, data) => {
    setIsUpdating(true);
    try {
      await axios.put(`https://rf-json-server.herokuapp.com/events/${id}`, {
        ...data,
        isActive: true,
        createdOn: Date.now, // TODO
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsUpdating(false);
    }
  };

  return [updateEvent, isUpdating];
};

export default useUpdateEvent;
