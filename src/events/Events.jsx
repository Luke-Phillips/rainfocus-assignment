import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { colorValidator } from '../validation/validators';
import { ErrorMessage } from '@hookform/error-message';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import useGetEvents from '../hooks/useGetEvents';
import useAddEvent from '../hooks/useAddEvent';
import useDeleteEvent from '../hooks/useDeleteEvent';

function Events() {
  // const events = useLoaderData();

  const [events, getEvents, isGettingEvent] = useGetEvents();
  const [addEvent, isAddingEvent] = useAddEvent();
  const [deleteEvent, isDeletingEvent] = useDeleteEvent();

  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onCreate = async (eventData) => {
    reset();
    setShowForm(false);
    await addEvent(eventData);
    getEvents();
  };

  return (
    <>
      <div className=''>Events</div>
      <div>
        {events.map((event) => (
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
          <form onSubmit={handleSubmit(onCreate)}>
            <div>
              <label>Name</label>
              <input
                className='border border-1 p-1'
                {...register('name', { required: true, maxLength: 100 })}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                className='border border-1 p-1'
                {...register('description', { required: true, maxLenght: 500 })}
              />
            </div>
            <div>
              <label>Company</label>
              <input
                className='border border-1 p-1'
                {...register('company', { required: true, maxLength: 100 })}
              />
            </div>
            <div>
              <label>Color</label>
              <select
                className='border border-1 p-1'
                {...register('color', { validate: colorValidator })}
              >
                <option value='red'>red</option>
                <option value='orange'>orange</option>
                <option value='yellow'>yellow</option>
                <option value='green'>green</option>
                <option value='blue'>blue</option>
                <option value='purple'>purple</option>
                <option value='black'>black</option>
                <option value='white'>white</option>
                <option value='brown'>brown</option>
              </select>
            </div>
            <div>
              <label>Email</label>
              <input
                className='border border-1 p-1'
                {...register('email', {
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                })}
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                className='border border-1 p-1'
                {...register('phone', {
                  required: true,
                  pattern: {
                    value:
                      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: 'Please enter a valid phone number',
                  },
                })}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                className='border border-1 p-1'
                {...register('address', { required: true, maxLength: 500 })}
              />
            </div>
            <div>
              <label>Image</label>
              <input
                className='border border-1 p-1'
                {...register('image', {})}
              />
            </div>
            <div>
              <label>Date</label>
              <input
                className='border border-1 p-1'
                {...register('date', {})}
              />
            </div>
            <div>
              <label>Time</label>
              <input
                className='border border-1 p-1'
                {...register('time', {})}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name='email'
              render={({ message }) => <p>{message}</p>}
            />
            <ErrorMessage
              errors={errors}
              name='phone'
              render={({ message }) => <p>{message}</p>}
            />
            <input
              type='submit'
              value='Create Event'
              className='border border-1 p-2 hover:bg-green-100 cursor-pointer'
            />
            <button
              onClick={() => setShowForm(false)}
              className='border p-2 hover:bg-red-100 cursor-pointer'
            >
              Cancel
            </button>
          </form>
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
