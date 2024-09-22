/* eslint-disable @typescript-eslint/no-explicit-any */
//import axios from 'axios';
import config from '../config';
import SSLCommerzPayment from 'sslcommerz-lts';

const store_id = config.store_id;
const store_passwd = config.store_password;
const is_live = false;

export const initiatePayment = async (paymentData: any) => {
  const data = {
    total_amount: paymentData.amount,
    currency: 'BDT',
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/payments/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `http://localhost:5000/api/payments/confirmation?status=failed`,
    cancel_url: `http://localhost:5000/cancel`,
    ipn_url: 'http://localhost:5000/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
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
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const apiResponse = await sslcz.init(data)
  
  return apiResponse.GatewayPageURL;
};

export const verifyPayment = async (valId: string) => {
  try {
    const data = {
      val_id: valId,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const response = await sslcz.validate(data)
    return response.data;
  } catch (err) {
    throw new Error('Payment validation failed!');
  }
};
