import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
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
      <div>
        {getEventsError ? (
          <button onClick={() => getEvents()}>
            {isGettingEvents ? (
              <ArrowPathIcon className='w-8 ml-24 m-24 animate-spin' />
            ) : (
              <>
                <p className='m-12 ml-24 text-red-500'>{getEventsError}</p>
                <p className='ml-24 mb-24 h-12 w-32 rounded-lg flex flex-row border justify-center hover:bg-blue-100 cursor-pointer items-center'>
                  Refresh
                </p>
              </>
            )}
          </button> // TODO style and is refreshing animate
        ) : sortedEvents.length === 0 ? (
          <p className='m-12 ml-24 text-2xl'>No Events Yet</p>
        ) : (
          <div className='mb-12'>
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className='py-6 border border-b-1 border-x-0 border-t-0 flex flex-row justify-between flex-center items-center'
              >
                <div className='ml-24'>
                  <div className='text-2xl mb-1'>{`${event.name}`}</div>
                  <div className='text-sm text-gray-500 mb-1'>{`hosted by ${event.company}`}</div>
                  <div className=''>{`${event.description}`}</div>
                </div>
                <div className='w-24 mr-24 flex flex-col justify-evenly items-center'>
                  <Link
                    className='p-4 mb-1 border rounded-lg hover:bg-blue-50'
                    to={`/events/${event.id}`}
                  >
                    <EyeIcon className='w-8' />
                  </Link>
                  <div
                    className='border cursor-pointer'
                    onClick={async () => {
                      setEventBeingDeletedId(event.id);
                      await deleteEvent(event.id);
                      setEventBeingDeletedId(null);
                      getEvents();
                    }}
                  >
                    {isDeletingEvent && eventBeingDeletedId === event.id ? (
                      <ArrowPathIcon className='w-8 animate-spin' />
                    ) : (
                      <div className='p-4 rounded-lg hover:bg-red-50'>
                        <TrashIcon className='w-8' />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          className='ml-24 mb-24 h-12 w-32 rounded-lg flex flex-row border justify-center hover:bg-blue-100 cursor-pointer items-center'
        >
          <p className='mr-1'>Add Event</p>
          <PlusIcon className='w-5' />
        </div>
      )}
      {isAddingEvent && (
        <div>
          <p>Adding Event</p>
          <ArrowPathIcon className='w-8 m-12 ml-24 animate-spin' />
        </div>
      )}
      {addEventError && !isAddingEvent && (
        <p className='ml-24 text-red-500'>{addEventError}</p>
      )}
    </>
  );
}

export default Events;
