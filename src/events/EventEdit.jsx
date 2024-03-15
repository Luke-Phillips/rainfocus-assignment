import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { colorValidator } from '../validation/validators';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import useUpdateEvent from '../hooks/useUpdateEvent';

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
  const navigate = useNavigate();
  const [updateEvent, isUpdatingEvent] = useUpdateEvent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: event.name,
      description: event.description,
      company: event.company,
      color: event.color,
      email: event.email,
      phone: event.phone,
      address: event.address,
      image: event.image,
      date: event.date,
      time: event.time,
    },
  });

  const onSave = async (eventData) => {
    await updateEvent(event.id, eventData);
    navigate(`/events/${event.id}`);
  };

  return event ? (
    <form onSubmit={handleSubmit(onSave)}>
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
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
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
        <input className='border border-1 p-1' {...register('image', {})} />
      </div>
      <div>
        <label>Date</label>
        <input className='border border-1 p-1' {...register('date', {})} />
      </div>
      <div>
        <label>Time</label>
        <input className='border border-1 p-1' {...register('time', {})} />
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
        value='Save'
        className='border border-1 p-2 hover:bg-green-100 cursor-pointer'
      />
      <Link
        to={`/events/${event.id}`}
        className='border p-2 hover:bg-red-100 cursor-pointer'
      >
        Cancel
      </Link>
    </form>
  ) : (
    <p>Event not found</p>
  );
}

export default Event;
