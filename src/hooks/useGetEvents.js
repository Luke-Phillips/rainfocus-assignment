import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGetEvents = () => {
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetch = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(
        'https://rf-json-server.herokuapp.com/events/'
      );
      setEvents(res.data);
    } catch (e) {
      console.log('error getting events data: ', e);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [events, fetch, isFetching];
};

export default useGetEvents;
