import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGetEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetch = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(
        'https://rf-json-server.herokuapp.com/events/'
      );
      setError(null);
      setEvents(res.data);
    } catch (e) {
      setError('error getting events data');
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [events, fetch, isFetching, error];
};

export default useGetEvents;
