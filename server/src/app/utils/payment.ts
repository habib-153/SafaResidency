/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../config';

const store_id = config.store_id;
const store_passwd = config.store_password;

export const initiatePayment = async (paymentData: any) => {
  const data = {
    store_id: store_id,
    store_passwd: store_passwd,
    total_amount: paymentData.amount,
    currency: 'BDT',
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/payments/confirmation?status=success`,
    fail_url: `http://localhost:5000/api/payments/confirmation?status=failed`,
    cancel_url: `http://localhost:5000/api/payments/confirmation?status=cancel`,
    // ipn_url: `http://localhost:5000/api/payments/ipn`,
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: paymentData.customerPhone,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  
  const apiResponse = await axios({
    method: 'POST',
    url: config.sslcommerz_init_payment_url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  })
  
  return apiResponse.data.GatewayPageURL;
};

export const verifyPayment = async (valId: string) => {
  try {
    const data = {
      val_id: valId,
      store_id: store_id,
      store_passwd: store_passwd,
    };
    const response = await axios({
      method: 'GET',
      url: config.sslcommerz_validation_url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
    // console.log(response, 'response')
    return response
  } catch (err) {
    throw new Error('Payment validation failed!');
  }
};