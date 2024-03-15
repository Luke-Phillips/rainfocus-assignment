import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import useGetEvents from '../hooks/useGetEvents';
import useAddEvent from '../hooks/useAddEvent';
import useDeleteEvent from '../hooks/useDeleteEvent';
import EventForm from './EventForm';

function Events() {
  // const events = useLoaderData();

  const [events, getEvents, isGettingEvent] = useGetEvents();
  const [addEvent, isAddingEvent] = useAddEvent();
  const [deleteEvent, isDeletingEvent] = useDeleteEvent();

  const sortedEvents = events.sort((eventA, eventB) =>
    eventA.company < eventB.company ? -1 : 1
  );

  const [showForm, setShowForm] = useState(false);

  const onCreate = async (eventData) => {
    setShowForm(false);
    await addEvent(eventData);
    getEvents();
  };

  return (
    <>
      <div className=''>Events</div>
      <div>
        {sortedEvents.map((event) => (
          <div key={event.id} className='my-6'>
            <Link to={`/events/${event.id}`}>
              <div>{`Event: ${event.name}`}</div>
              <div>{`Description: ${event.description}`}</div>
              <div>{`Company: ${event.company}`}</div>
            </Link>
            <div
              onClick={async () => {
                await deleteEvent(event.id);
                getEvents();
              }}
            >
              <TrashIcon className='w-5' />
            </div>
          </div>
        ))}
        {showForm ? (
          <EventForm
            onSubmit={onCreate}
            onCancel={() => setShowForm(false)}
            submitLabel='Create Event'
            cancelLabel='Cancel'
          />
        ) : (
          <div
            onClick={() => setShowForm(true)}
            className='flex border w-32 justify-center hover:bg-blue-100 cursor-pointer'
          >
            <p>Add Event</p>
            <PlusIcon className='w-5' />
          </div>
        )}
      </div>
    </>
  );
}

export default Events;
