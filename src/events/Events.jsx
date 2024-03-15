import { useLoaderData, Link } from 'react-router-dom';
import axios from 'axios';
// import { TrashIcon } from '@heroicons/react/24/outline';

export async function loader() {
  try {
    const res = await axios.get('https://rf-json-server.herokuapp.com/events/');
    return res.data;
  } catch {
    console.log('error getting events data');
    return [];
  }
}

function Events() {
  const events = useLoaderData();
  return (
    <>
      <div>List of Events</div>
      <div>
        {events.map((event) => (
          <>
            <Link key={event.id} to={`/events/${event.id}`}>
              <div>{`Event: ${event.name}`}</div>
              <div>{`Description: ${event.description}`}</div>
              <div>{`Company: ${event.company}`}</div>
            </Link>
            {/* <TrashIcon /> */}
          </>
        ))}
      </div>
    </>
  );
}

export default Events;
