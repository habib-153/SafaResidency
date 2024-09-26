/* eslint-disable react/prop-types */
import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addBooking } from './bookingSlice'; // Assume this action exists in your Redux setup

const Booking = () => {
    const id = useParams()
    const bookedDates = null
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
//   const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add booking
    // dispatch(addBooking({ id, startDate, endDate, guestName, email }));
      console.log({ id, startDate, endDate, guestName, email });
    // Reset form
    setStartDate(null);
    setEndDate(null);
    setGuestName('');
    setEmail('');
  };

    const isDateBooked = (date) => {
    return bookedDates?.some(bookedDate => 
      date.getTime() === new Date(bookedDate).getTime()
        );
        
        };
        isDateBooked()

  

  return (
      <div className="max-w-md mx-auto bg-[#F7F4ED] text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gold">Book a Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Check-in Date:</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className="w-full p-2 rounded bg-white text-black"
            dayClassName={date =>
              (isDateBooked(date) || date === startDate) ? "bg-gold text-black" : undefined
            }
          />
        </div>
        <div>
          <label className="block mb-1">Check-out Date:</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full p-2 rounded bg-white text-black"
            dayClassName={date =>
              (isDateBooked(date) || date === endDate) ? "bg-gold text-black" : undefined
            }
          />
        </div>
        <div>
          <label className="block mb-1">Guest Name:</label>
          <input
            type="text"
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            className="w-full p-2 rounded bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-white text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gold text-black font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;