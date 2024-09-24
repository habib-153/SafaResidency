/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path';
import { Booking } from '../booking/booking.model';
import { readFileSync } from 'fs';
import { verifyPayment } from '../../utils/payment';
import { Room } from '../room/room.model';

const confirmationService = async (data: any, status: string) => {
  let result;
  let message = '';

  if (status === 'success') {
    const verifyResponse = await verifyPayment(data?.val_id);
    if (verifyResponse && verifyResponse.statusText === 'OK') {
      const booking = await Booking.findOne({ transactionId: data?.tran_id });
      if (booking) {
        const room = await Room.findByIdAndUpdate(booking.room, {
          status: 'booked',
        });

        result = await Booking.updateOne(
          { _id: booking._id },
          {
            $set: {
              paymentStatus: 'Paid',
              isConfirmed: true,
            },
          },
          { new: true },
        );
      }
      message = 'Successfully Paid!';
    } else {
      message = 'Payment Verification Failed!';
    }
  }
  if (status === 'failed') {
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../../../confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
