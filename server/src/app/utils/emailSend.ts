import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (email: string, data: Record<string, unknown>, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.sender_email,
      pass: config.sender_app_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Generate the email template
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation - Safa Residency</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap');
            
            body {
                font-family: 'Poppins', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-image: url('https://i.ibb.co.com/QrSDm0P/logo-safa-removebg-preview.png');
                background-size: cover;
                background-position: center;
                height: 180px;
                position: relative;
            }
            .header::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
            .header-content {
                position: relative;
                z-index: 1;
                text-align: center;
                padding: 50px 20px;
                color: #ffffff;
            }
            .logo {
                max-width: 120px;
                display: block;
                margin: 0 auto 15px;
            }
            h1 {
                font-family: 'Playfair Display', serif;
                font-size: 36px;
                margin: 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            .content {
                padding: 40px;
            }
            .greeting {
                font-size: 24px;
                color: #c49a3b;
                margin-bottom: 20px;
            }
            .booking-details {
                background-color: #f9f9f9;
                border: 1px solid #e0e0e0;
                border-radius: 10px;
                padding: 30px;
                margin-top: 30px;
                position: relative;
                overflow: hidden;
            }
            .booking-details::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 5px;
                background: linear-gradient(to right, #c49a3b, #e5b653);
            }
            .booking-details h3 {
                color: #c49a3b;
                font-family: 'Playfair Display', serif;
                font-size: 24px;
                margin-top: 0;
                margin-bottom: 20px;
            }
            .booking-details ul {
                list-style-type: none;
                padding: 0;
            }
            .booking-details li {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
            }
            .booking-details li:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            .booking-details strong {
                color: #333;
                font-weight: 600;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(to right, #c49a3b, #e5b653);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 50px;
                font-weight: 600;
                margin-top: 30px;
                transition: all 0.3s ease;
                text-align: center;
            }
            .cta-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(196, 154, 59, 0.3);
            }
            .footer {
                background-color: #1a1a1a;
                color: #c49a3b;
                text-align: center;
                padding: 20px;
                font-size: 14px;
            }
            .footer a {
                color: #e5b653;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                
            </div>
            <div class="content">
                <p class="greeting">Dear ${data.name},</p>
                <p>We are thrilled to confirm your upcoming stay at Safa Residency. Prepare for an unforgettable experience of luxury and comfort.</p>
                <div class="booking-details">
                    <h3>Your Reservation Details</h3>
                    <ul>
                        <li><strong>Booking ID:</strong> <span>${data.id}</span></li>
                        <li><strong>Check-in:</strong> <span>${data.startDate}</span></li>
                        <li><strong>Check-out:</strong> <span>${data.endDate}</span></li>
                        <li><strong>Room Type:</strong> <span>${data.room}</span></li>
                        <li><strong>Total Amount:</strong> <span>${data.amount} BDT</span></li>
                        <li><strong>Payment Status:</strong> <span>${data.paymentStatus}</span></li>
                    </ul>
                </div>
                <p>At Safa Residency, we're dedicated to making your stay extraordinary. Our team is on hand to cater to your every need and ensure your visit exceeds all expectations.</p>
                <a href="#" class="cta-button text-white">Manage Your Reservation</a>
                <p>We look forward to welcoming you soon and providing you with an exceptional stay.</p>
                <p>Warm regards,<br>The Safa Residency Team</p>
            </div>
            <div class="footer">
                © 2024 Safa Residency. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </div>
        </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: '"Safa Residency" <safa.residency.bd@gmail.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line.
    html, // html body
  });
};

export const EmailHelper = {
  sendEmail,
};