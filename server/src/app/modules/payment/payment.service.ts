/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from "path";
import { Booking } from "../booking/booking.model";
import { readFileSync } from "fs";
import { verifyPayment } from "../../utils/payment";

  const confirmationService = async (transactionId: string, status: string) => {
    let result;
    let message = '';
  
    if (status === 'success') {
      const verifyResponse = await verifyPayment(transactionId);
  
      if (verifyResponse && verifyResponse.status === 'VALID') {
        result = await Booking.updateOne(
          { transactionId },
          {
            paymentStatus: 'Paid',
          },
          {
            new: true,
          },
        );
        message = 'Successfully Paid!';
      } else {
        message = 'Payment Verification Failed!';
      }
    } else {
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