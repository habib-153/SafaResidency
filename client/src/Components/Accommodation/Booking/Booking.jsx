/* eslint-disable react/prop-types */
import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { useGetSingleRoomQuery } from '../../../redux/features/room/roomApi';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
// import { useDispatch } from 'react-redux';
// import { addBooking } from './bookingSlice'; // Assume this action exists in your Redux setup

const Booking = () => {
    const id = useParams()
  const bookedDates = null
  const { data} = useGetSingleRoomQuery(id);
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
    setIsModalOpen(true);
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

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const dispatch = useDispatch();


  console.log(data);

  const handleConfirmBooking = () => {
    // Here you would integrate with SSL Commerce for payment processing
    // For this example, we'll just dispatch the action
    // dispatch(addBooking({ roomId, startDate, endDate, guestName, email }));
    setIsModalOpen(false);
    // Reset form
    setStartDate(null);
    setEndDate(null);
  };



  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;

    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const cost = days * data?.data?.price;
    console.log(days, cost, startDate, endDate);
    return cost
  };

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
        <Dialog
          open={isModalOpen}
          handler={() => setIsModalOpen(false)}
          className="bg-[#F7F4ED] text-black"
        >
          <DialogHeader className="text-gold">Confirm Guest Booking</DialogHeader>
          <DialogBody divider className="grid gap-4">
            <p><span className="font-bold">Guest:</span> {guestName}</p>
            <p><span className="font-bold">Email:</span> {email}</p>
            <p><span className="font-bold">Room Category:</span> {data?.data?.category}</p>
            <p><span className="font-bold">Room Name:</span>  {data?.data?.room_overview?.name}</p>
            <p><span className="font-bold"> Room Number: </span> {data?.data?.room_overview?.room_number
            }</p>
            <p><span className="font-bold">Check-in:</span> {startDate ? startDate.toDateString() : 'Not selected'}</p>
            <p><span className="font-bold">Check-out:</span> {endDate ? endDate.toDateString() : 'Not selected'}</p>
            <p><span className="font-bold">Total Price:</span> ${calculateTotalPrice()}</p>
          </DialogBody>
          <DialogFooter className="space-x-4">
            <Button
              variant="text"
              color="red"
              onClick={() => setIsModalOpen(false)}
              className="mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleConfirmBooking}
            >
              Pay with SSL Commerce
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
    </div>
  );
};

export default Booking;