"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHelper = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
// Create transporter once
const createTransporter = () => {
    return nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.sender_email,
            pass: config_1.default.sender_app_password,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
};
// Base email sending function
const sendMailWithTemplate = (to, subject, htmlContent) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTransporter();
    yield transporter.sendMail({
        from: '"Safa Residency" <safa.residency.bd@gmail.com>',
        to,
        subject,
        html: htmlContent,
    });
});
// Generate booking confirmation template
const generateBookingTemplate = (data, isAdmin = false) => {
    const baseTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Invoice - Safa Residency</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333;">
    <table width="800" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; background: white;">
        <tr>
            <td style="padding: 20px;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                    <tr>
                        <td style="font-size: 18px; font-weight: bold; color: #2c3e50;">
                            ${isAdmin ? '' : 'Reservation Letter'}
                        </td>
                        <td width="120">
                            <img src="https://i.ibb.co.com/QrSDm0P/logo-safa-removebg-preview.png" alt="Safa Residency" style="max-width: 100px; display: block;">
                        </td>
                        <td style="text-align: right; font-size: 12px; color: #666;">
                            <div>Entry Date: ${data.orderDate || ''}</div>
                        </td>
                    </tr>
                </table>

                ${isAdmin
        ? `
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                    <tr>
                        <td style="font-size: 12px; color: #333;">
                            <p style="margin: 0;">Confirm This New Booking, There are a new Reservation in Website. Please Confirm this by contact the user who booked this and update booking from dashboard.</p>
                        </td>
                    </tr>
                </table>
                `
        : `
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                    <tr>
                        <td style="font-size: 12px; color: #333;">
                            <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #2c3e50;">Dear Valued Guest,</h4>
                            <p style="margin: 0;">We truly appreciate your kind patronage at <span style="font-weight: bold;">Safa Residency</span>. Please refer to details of your reservation outlined below:</p>
                        </td>
                    </tr>
                </table>
                `}

                <p style="font-size: 14px; font-weight: bold; color: #2c3e50; margin: 15px 0 10px;">Reservation Details:</p>
                
                <!-- Guest Information -->
                <table width="100%" cellpadding="4" cellspacing="0" border="0" style="margin-bottom: 20px; font-size: 12px;">
                    <tr>
                        <td width="120" style="color: #666;">Name</td>
                        <td>: ${data.name || 'N/A'}</td>
                        <td style="color: #666;">Company</td>
                        <td>: Safa Residency</td>
                    </tr>
                    <tr>
                        <td style="color: #666;">PHONE</td>
                        <td>: ${data.phone || 'N/A'}</td>
                        <td style="color: #666;">PHONE</td>
                        <td>: +8801831-335222</td>
                    </tr>
                    <tr>
                        <td style="color: #666;">E-MAIL</td>
                        <td>: ${data.email || 'N/A'}</td>
                        <td style="color: #666;">E-MAIL</td>
                        <td>: info@safaresidency.com</td>
                    </tr>
                    <tr>
                        <td style="color: #666;">SOURCE</td>
                        <td>: Web</td>
                        <td style="color: #666;">ADDRESS</td>
                        <td>: House -08, Road -20, Nikunja 2, Dhaka</td>
                    </tr>
                    <tr>
                        <td style="color: #666;">ADDRESS</td>
                        <td>: ${data.address || 'N/A'}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="color: #666;">Payment Status</td>
                        <td>: <span style="color: #e74c3c;">Unpaid</span></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

                <p style="font-size: 14px; font-weight: bold; color: #2c3e50; margin: 15px 0 10px;">Accommodation Details:</p>
                
                <!-- Room Details -->
                <table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; margin-bottom: 20px; border-color: #ddd;">
                    <tr style="background: #f8f9fa;">
                        <th style="font-size: 12px; color: #2c3e50;">Reservation Number</th>
                        <th style="font-size: 12px; color: #2c3e50;">Room Type</th>
                        <th style="font-size: 12px; color: #2c3e50;">Check-In Date</th>
                        <th style="font-size: 12px; color: #2c3e50;">Check-Out Date</th>
                        <th style="font-size: 12px; color: #2c3e50;">Nights</th>
                        <th style="font-size: 12px; color: #2c3e50;">Rate/Night</th>
                        <th style="font-size: 12px; color: #2c3e50;">Amount</th>
                    </tr>
                    <tr style="font-size: 12px;">
                        <td>${data.reservationId}</td>
                        <td>${data.roomType}</td>
                        <td>${data.startDate}</td>
                        <td>${data.endDate}</td>
                        <td>${data.nights}</td>
                        <td>$ ${data.perNightCost.toFixed(2)}</td>
                        <td>$ ${data.withOutVatAndService.toFixed(2)}</td>
                    </tr>
                    <tr style="font-size: 12px;">
                        <td colspan="7" style="text-align: right; padding-right: 15px;">Service Charge</td>
                        <td>$ ${data.serviceCharge.toFixed(2)}</td>
                    </tr>
                    <tr style="font-size: 12px;">
                        <td colspan="7" style="text-align: right; padding-right: 15px;">Govt. Vat</td>
                        <td>$ ${data.vat.toFixed(2)}</td>
                    </tr>
                    <tr style="font-size: 12px; font-weight: bold;">
                        <td colspan="7" style="text-align: right; padding-right: 15px;">Total</td>
                        <td>$ ${data.amount.toFixed(2)}</td>
                    </tr>
                    <tr style="font-size: 12px;">
                        <td colspan="7" style="text-align: right; padding-right: 15px;">Advance</td>
                        <td>0</td>
                    </tr>
                    <tr style="font-size: 12px; font-weight: bold;">
                        <td colspan="7" style="text-align: right; padding-right: 15px;">Due</td>
                        <td>$ ${data.amount.toFixed(2)}</td>
                    </tr>
                </table>

                <!-- Terms -->
                <div style="font-size: 11px; margin-top: 20px; color: #444;">
                    <p style="font-weight: bold; margin-bottom: 10px; color: #2c3e50;">Please Note:</p>
                    <ol style="padding-left: 20px; margin: 0;">
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Identification:</span> Service ID for Army Officers during booking and NID / Passport for all adults are mandatory during check-in time.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Cancellation / Date Change Policy:</span> Before check-in [72 hours 0%], [72-48 hours 10%], [48 - 24 hours 25%], [24 hours 50%] charge will be applied.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Complimentary Services:</span> Complimentary Buffet Breakfast, Gym, Swimming Pool & Kit-Kot Chair.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Check-in & Check-out Policy:</span> Our standard check-in time is after 14:00:00 & check-out time is before 12:00:00.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Early Check-in Policy:</span> Subject to availability early check-in before 12 pm 25% charge will be applied.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Late Check-out Policy:</span> Subject to availability late check-out after [12 pm to 2 pm 25%], [2 pm to 6 pm 50%], after 6 pm full day charge will be applied.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Extra Bed Policy:</span> Extra Bed Charge per night inclusive of Complimentary services. (Mandatory of children aged 12 years & above).</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Child Policy:</span> Breakfast will be complimentary for child up to 5 years. Child age (6-12) Add Extra breakfast charge.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Pet Policy:</span> No pets are allowed inside the premises / property.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Smoking Policy:</span> All guest rooms are non-smoking. Smoking is allowed only at designated area inside the property.</li>
                        <li style="margin-bottom: 5px;"><span style="font-weight: bold;">Weapon Carrier:</span> Guest are not allowed to stay in room with weapon. In such cases guest may handed over the weapon & ammunition to the hotel security officer.</li>
                        <li style="margin-bottom: 5px;">Bringing outside food into the hotel is not allowed.</li>
                        <li style="margin-bottom: 5px;">Only the registered number of guests are allowed.</li>
                        <li style="margin-bottom: 5px; font-weight: bold;">Please do not hesitate to communicate with us for any further information.</li>
                    </ol>
                </div>

                ${isAdmin
        ? `
                <!-- Styled Confirm Booking Button -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                    <tr>
                        <td align="center">
                            <a href="https://safaresidency.com/admin/reservation" 
                               style="background-color: #4CAF50; 
                                      color: white; 
                                      padding: 12px 30px; 
                                      text-decoration: none; 
                                      font-size: 16px; 
                                      border-radius: 5px; 
                                      font-weight: bold; 
                                      display: inline-block; 
                                      border: 0;
                                      cursor: pointer;
                                      box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                                Confirm Booking
                            </a>
                        </td>
                    </tr>
                </table>
                `
        : `
                <div style="margin-top: 20px; font-size: 11px; color: #666;">
                    <p style="font-weight: bold; margin-bottom: 5px;">Gratitude</p>
                    <p>Reservation Desk</p>
                    <p>Safa Residency</p>
                </div>
                `}
                <div style="margin-top: 20px; font-size: 10px; color: #666; text-align: center">
                    <p>House -08, Road -20, Nikunja 2, Commercial Area, Airport Road, Khilkhet, Dhaka-1229, Bangladesh</p>
                    <p>Web: <a href="https://safaresidency.com/">www.safaresidency.com</a></p>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
    return baseTemplate;
};
// Generate status update template
const generateStatusUpdateTemplate = (data) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Status Update - Safa Residency</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333;">
    <table width="800" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; background: white;">
        <tr>
            <td style="padding: 20px;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                    <tr>
                        <td style="font-size: 18px; font-weight: bold; color: #2c3e50;">
                            Booking Status Update
                        </td>
                        <td width="150">
                            <img src="https://i.ibb.co.com/QrSDm0P/logo-safa-removebg-preview.png" alt="Safa Residency" style="max-width: 100px; display: block;">
                        </td>
                    </tr>
                </table>

                <!-- Greeting -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                    <tr>
                        <td style="font-size: 14px; color: #333;">
                            <p style="margin: 0 0 15px 0;">Dear ${data.name},</p>
                            <p style="margin: 0 0 20px 0;">Your booking status has been updated. Please find the details below:</p>
                        </td>
                    </tr>
                </table>

                <!-- Booking Details -->
                <table width="100%" cellpadding="10" cellspacing="0" border="0" style="margin-bottom: 20px; background: #f8f9fa; border-radius: 5px;">
                    <tr>
                        <td style="padding: 15px;">
                            <table width="100%" cellpadding="5" cellspacing="0" border="0">
                                <tr>
                                    <td width="150" style="color: #666;">Booking ID:</td>
                                    <td style="font-weight: bold;">${data.transactionId}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Room:</td>
                                    <td style="font-weight: bold;">${data.room}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Check-in:</td>
                                    <td style="font-weight: bold;">${data.startDate}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Check-out:</td>
                                    <td style="font-weight: bold;">${data.endDate}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Amount:</td>
                                    <td style="font-weight: bold;">$${data.amount}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Payment Status:</td>
                                    <td>
                                        <span style="
                                            background-color: ${data.paymentStatus.toLowerCase() === 'paid' ? '#4CAF50' : '#ff9800'};
                                            color: white;
                                            padding: 3px 10px;
                                            border-radius: 3px;
                                            font-size: 12px;
                                        ">${data.paymentStatus}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Booking Status:</td>
                                    <td>
                                        <span style="
                                            background-color: ${data.confirmation.toLowerCase() === 'confirmed' ? '#4CAF50' : '#ff9800'};
                                            color: white;
                                            padding: 3px 10px;
                                            border-radius: 3px;
                                            font-size: 12px;
                                        ">${data.confirmation}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                            <p style="margin: 0 0 10px 0;">Thank you for choosing Safa Residency!</p>
                            <p style="margin: 0;">If you have any questions, please don't hesitate to <a href="https://safaresidency.com/contact">contact</a> our support team.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
// Generate booking cancellation template
const generateCancellationTemplate = (data) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Cancellation - Safa Residency</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333;">
    <table width="800" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; background: white;">
        <tr>
            <td style="padding: 20px;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                    <tr>
                        <td style="font-size: 18px; font-weight: bold; color: #2c3e50;">
                            Booking Cancellation Notice
                        </td>
                        <td width="150">
                            <img src="https://i.ibb.co.com/QrSDm0P/logo-safa-removebg-preview.png" alt="Safa Residency" style="max-width: 100px; display: block;">
                        </td>
                    </tr>
                </table>

                <!-- Notice Box -->
                <table width="100%" cellpadding="15" cellspacing="0" border="0" style="margin-bottom: 20px; background: #fff3e0; border-radius: 5px;">
                    <tr>
                        <td>
                            <p style="margin: 0; color: #e65100; font-weight: bold;">Important Notice</p>
                            <p style="margin: 10px 0 0 0; color: #666;">Your booking has been cancelled. Details of the cancelled reservation are provided below.</p>
                        </td>
                    </tr>
                </table>

                <!-- Booking Details -->
                <table width="100%" cellpadding="10" cellspacing="0" border="0" style="margin-bottom: 20px; background: #f8f9fa; border-radius: 5px;">
                    <tr>
                        <td style="padding: 15px;">
                            <table width="100%" cellpadding="5" cellspacing="0" border="0">
                                <tr>
                                    <td width="150" style="color: #666;">Booking ID:</td>
                                    <td style="font-weight: bold;">${data.transactionId}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Room:</td>
                                    <td style="font-weight: bold;">${data.room}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Original Check-in:</td>
                                    <td style="font-weight: bold;">${data.startDate}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Original Check-out:</td>
                                    <td style="font-weight: bold;">${data.endDate}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Amount:</td>
                                    <td style="font-weight: bold;">$${data.amount}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Cancellation Date:</td>
                                    <td style="font-weight: bold;">${data.cancellationDate}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Support Info -->
                <table width="100%" cellpadding="15" cellspacing="0" border="0" style="margin-bottom: 20px; background: #f8f9fa; border-radius: 5px;">
                    <tr>
                        <td>
                            <p style="margin: 0 0 10px 0; font-weight: bold; color: #2c3e50;">Need Assistance?</p>
                            <p style="margin: 0; color: #666;">If you believe this cancellation was made in error or have any questions, please <a href="https://safaresidency.com/contact">contact</a> our support team immediately.</p>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                            <p style="margin: 0 0 10px 0;">Thank you for your understanding.</p>
                            <p style="margin: 0;">We hope to have the opportunity to serve you again in the future.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
exports.EmailHelper = {
    // New booking emails
    sendBookingEmails: (data) => __awaiter(void 0, void 0, void 0, function* () {
        // Send to user
        yield sendMailWithTemplate(data.email, 'Booking Confirmation - Safa Residency', generateBookingTemplate(data));
        // Send to admin
        yield sendMailWithTemplate('info@safaresidency.com', 'Confirm New Booking - Safa Residency', generateBookingTemplate(data, true));
    }),
    // Status update email
    sendStatusUpdateEmail: (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield sendMailWithTemplate(data.email, 'Booking Status Update - Safa Residency', generateStatusUpdateTemplate(data));
    }),
    // Cancellation email
    sendCancellationEmail: (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield sendMailWithTemplate(data.email, 'Booking Cancellation - Safa Residency', generateCancellationTemplate(data));
    }),
};
