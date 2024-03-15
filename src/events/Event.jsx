import { useLoaderData, Link } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export async function loader({ params }) {
  try {
    const res = await axios.get(
      `https://rf-json-server.herokuapp.com/events/${params.id}`
    );
    return res.data;
  } catch {
    console.log('error getting events data');
    return null;
  }
}

function Event() {
  const event = useLoaderData();
  return event ? (
    <>
      <div>{event.color}</div>
      <div>{event.isActive}</div>
      <div>{event.name}</div>
      <div>{event.date}</div>
      <div>{event.time}</div>
      <div>{event.company}</div>
      <div>{event.email}</div>
      <div>{event.phone}</div>
      <div>{event.address}</div>
      <div>{event.description}</div>
      <div>{event.image}</div>
      <div>{event.createdOn}</div>
      <Link to={`/events/${event.id}/edit`}>
        <PencilIcon className='w-5' />
      </Link>
    </>
  ) : (
    <p>Event not found</p>
  );
}

export default Event;
