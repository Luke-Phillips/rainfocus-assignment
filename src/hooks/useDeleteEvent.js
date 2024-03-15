import { useState } from 'react';
import axios from 'axios';

const useDeleteEvent = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const addEvent = async (id) => {
    setIsDeleting(true);
    try {
      await axios.delete(`https://rf-json-server.herokuapp.com/events/${id}`);
    } catch (e) {
      console.log(`error deleting event ${id}: `, e);
    } finally {
      setIsDeleting(false);
    }
  };

  return [addEvent, isDeleting];
};

export default useDeleteEvent;
