import { useState } from 'react';
import axios from 'axios';

const useDeleteEvent = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const addEvent = async (id) => {
    setIsDeleting(true);
    try {
      await axios.delete(`https://rf-json-server.herokuapp.com/events/${id}`);
      setError(null);
    } catch (e) {
      setError(`error deleting event ${id}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return [addEvent, isDeleting, error];
};

export default useDeleteEvent;
