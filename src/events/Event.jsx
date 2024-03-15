import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import useDeleteEvent from '../hooks/useDeleteEvent';

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
  const [deleteEvent, isDeletingEvent, deleteEventError] = useDeleteEvent();
  const navigate = useNavigate();

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
      <Link to={`/events/${event.id}/edit`} replace>
        <PencilIcon className='w-5' />
      </Link>
      <div
        onClick={async () => {
          await deleteEvent(event.id);
          if (!deleteEventError) {
            navigate('/events');
          }
        }}
      >
        {isDeletingEvent ? (
          <div>
            <p>Deleting event</p>
            <ArrowPathIcon className='w-5 animate-spin' />
          </div>
        ) : (
          <TrashIcon className='w-5' />
        )}
        {deleteEventError && <p>{deleteEventError}</p>}
      </div>
    </>
  ) : (
    <p>Event not found</p>
  );
}

export default Event;
