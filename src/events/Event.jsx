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
      <h1 className='m-6 text-2xl'>Event Details</h1>
      <div className='ml-12'>
        <div className='mb-1'>Name: {event.name}</div>
        <div className='mb-1'>Company: {event.company}</div>
        <div>Description: {event.description}</div>
        <div>Color: {event.color}</div>
        <div>Email: {event.email}</div>
        <div>Phone: {event.phone}</div>
        <div>Address: {event.address}</div>
        <div>Date: {event.date}</div>
        <div>Time: {event.time}</div>
        <div>Image: {event.image}</div>
        <div className='w-64 flex mt-3 justify-evenly'>
          <Link
            className='p-4 rounded-lg hover:bg-blue-50 border'
            to={`/events/${event.id}/edit`}
            replace
          >
            <PencilIcon className='w-8' />
          </Link>
          <div
            className='p-4 cursor-pointer border rounded-lg hover:bg-red-50'
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
              <TrashIcon className='w-8 ' />
            )}
            {deleteEventError && <p>{deleteEventError}</p>}
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Event not found</p>
  );
}

export default Event;
