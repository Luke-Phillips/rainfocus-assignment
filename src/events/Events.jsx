import { useLoaderData, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { colorValidator } from '../validation/validators';
import { ErrorMessage } from '@hookform/error-message';
// import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

export async function loader() {
  try {
    const res = await axios.get('https://rf-json-server.herokuapp.com/events/');
    return res.data;
  } catch (e) {
    console.log('error getting events data: ', e);
    return [];
  }
}

const onSubmit = async (data) => {
  console.log('here with ', data);
  try {
    const event = await axios.post(
      'https://rf-json-server.herokuapp.com/events/',
      {
        ...data,
        isActive: true,
        createdOn: Date.now,
      }
    );
    console.log(event);
  } catch (e) {
    console.log(e);
  }
};

function Events() {
  const events = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className=''>Events</div>
      <div>
        {events.map((event) => (
          <div key={event.id}>
            <Link to={`/events/${event.id}`}>
              <div>{`Event: ${event.name}`}</div>
              <div>{`Description: ${event.description}`}</div>
              <div>{`Company: ${event.company}`}</div>
            </Link>
            {/* <TrashIcon /> */}
          </div>
        ))}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input
            className='border border-1 p-1'
            {...register('name', { required: true, maxLength: 100 })}
          />
          <label>Description</label>
          <input
            className='border border-1 p-1'
            {...register('description', { required: true, maxLenght: 500 })}
          />
          <label>Company</label>
          <input
            className='border border-1 p-1'
            {...register('company', { required: true, maxLength: 100 })}
          />
          <label>Color</label>
          <select {...register('color', { validate: colorValidator })}>
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
          <label>Address</label>
          <input
            className='border border-1 p-1'
            {...register('address', { required: true, maxLength: 500 })}
          />
          <label>Image</label>
          <input className='border border-1 p-1' {...register('image', {})} />
          <label>Date</label>
          <input className='border border-1 p-1' {...register('date', {})} />
          <label>Time</label>
          <input className='border border-1 p-1' {...register('time', {})} />
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
          <input type='submit' value='Create Event' />
        </form>
      </div>
    </>
  );
}

export default Events;
