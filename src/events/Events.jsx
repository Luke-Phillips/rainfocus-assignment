import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import useGetEvents from '../hooks/useGetEvents';
import useAddEvent from '../hooks/useAddEvent';
import useDeleteEvent from '../hooks/useDeleteEvent';
import EventForm from './EventForm';

function Events() {
  const [events, getEvents, isGettingEvents, getEventsError] = useGetEvents();
  const [addEvent, isAddingEvent, addEventError] = useAddEvent();
  const [deleteEvent, isDeletingEvent] = useDeleteEvent();

  const sortedEvents = events.sort((eventA, eventB) =>
    eventA.company < eventB.company ? -1 : 1
  );

  const [eventBeingDeletedId, setEventBeingDeletedId] = useState(null);
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
        {getEventsError ? (
          <button onClick={() => getEvents()}>
            {isGettingEvents ? (
              <ArrowPathIcon className='w-5 animate-spin' />
            ) : (
              <>
                <p>{getEventsError}</p>
                <p>Refresh</p>
              </>
            )}
          </button> // TODO style and is refreshing animate
        ) : sortedEvents.length === 0 ? (
          <p>No Events Yet</p>
        ) : (
          sortedEvents.map((event) => (
            <div key={event.id} className='my-6'>
              <Link to={`/events/${event.id}`}>
                <div>{`Event: ${event.name}`}</div>
                <div>{`Description: ${event.description}`}</div>
                <div>{`Company: ${event.company}`}</div>
              </Link>
              <div
                onClick={async () => {
                  setEventBeingDeletedId(event.id);
                  await deleteEvent(event.id);
                  setEventBeingDeletedId(null);
                  getEvents();
                }}
              >
                {isDeletingEvent && eventBeingDeletedId === event.id ? (
                  <div>
                    <p>Deleting Event</p>
                    <ArrowPathIcon className='w-5 animate-spin' />
                  </div>
                ) : (
                  <TrashIcon className='w-5' />
                )}
              </div>
            </div>
          ))
        )}
      </div>
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
      {isAddingEvent && (
        <div>
          <p>Adding Event</p>
          <ArrowPathIcon className='w-5 animate-spin' />
        </div>
      )}
      {addEventError && !isAddingEvent && <p>{addEventError}</p>}
    </>
  );
}

export default Events;
