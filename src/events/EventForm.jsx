import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { colorValidator } from '../validation/validators';
import { ErrorMessage } from '@hookform/error-message';

const EventForm = ({
  defaults,
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(defaults);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitWrapper = async (eventData) => {
    setIsSubmitting(true);
    reset(eventData);
    await onSubmit(eventData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)}>
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
          {...register('address', { maxLength: 500 })}
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
        value={submitLabel}
        disabled={isSubmitting}
        className='border border-1 p-2 hover:bg-green-100 cursor-pointer disabled:bg-slate-100 disabled:text-slate-500 disabled:hover:bg-slate-100'
      />
      <button
        onClick={onCancel}
        disabled={isSubmitting}
        className='border p-2 hover:bg-red-100 cursor-pointer disabled:bg-slate-100 disabled:text-slate-500 disabled:hover:bg-slate-100'
      >
        {cancelLabel}
      </button>
      {isSubmitting && <ArrowPathIcon className='w-5 animate-spin' />}
    </form>
  );
};

export default EventForm;
