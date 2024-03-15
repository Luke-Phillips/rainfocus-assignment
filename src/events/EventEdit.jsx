import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUpdateEvent from '../hooks/useUpdateEvent';
import EventForm from './EventForm';

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
  const [updateEvent] = useUpdateEvent();

  const eventFormDefaults = {
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
  };

  const onSave = async (eventData) => {
    await updateEvent(event.id, eventData);
    navigate(`/events/${event.id}`);
  };

  const onCancel = async () => {
    navigate(`/events/${event.id}`);
  };

  return event ? (
    <EventForm
      defaults={eventFormDefaults}
      onSubmit={onSave}
      onCancel={onCancel}
      submitLabel='Save Event'
      cancelLabel='Cancel'
    />
  ) : (
    <p>Event not found</p>
  );
}

export default Event;
