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
const sendEmail = (email, data, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: config_1.default.sender_email,
            pass: config_1.default.sender_app_password,
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
    <title>Booking Invoice - Safa Residency</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #000;">
    <!-- Email container with fixed width -->
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; background: white;">
        <tr>
            <td style="padding: 20px;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                    <tr>
                        <td width="120">
                            <img src="https://i.ibb.co.com/QrSDm0P/logo-safa-removebg-preview.png" alt="Safa Residency" style="max-width: 100px; display: block;">
                        </td>
                        <td style="font-size: 11px; color: #666;">
                            Reservation Guest
                        </td>
                        <td style="text-align: right; font-size: 11px; color: #666;">
                            <div>Order Date: ${data.orderDate || ''}</div>
                            <div>Print Date: ${new Date().toLocaleDateString()}</div>
                            <div>Print Time: ${new Date().toLocaleTimeString()}</div>
                        </td>
                    </tr>
                </table>

                <!-- Guest Information -->
                <table width="100%" cellpadding="2" cellspacing="0" border="0" style="margin-bottom: 15px; font-size: 11px;">
                    <tr>
                        <td width="120">NAME</td>
                        <td>: ${data.name || 'N/A'}</td>
                        <td>Reservation</td>
                        <td>: ${data.id || ''}</td>
                    </tr>
                    <tr>
                        <td>MR_NAMED_FIRST</td>
                        <td>: ${data.name || 'N/A'}</td>
                        <td>Check In</td>
                        <td>: ${data.startDate || ''}</td>
                    </tr>
                    <tr>
                        <td>E-MAIL</td>
                        <td>: ${data.email || 'N/A'}</td>
                        <td>Check Out</td>
                        <td>: ${data.endDate || ''}</td>
                    </tr>
                    <tr>
                        <td>CONTACT PERSON</td>
                        <td>: ${data.name || 'N/A'}</td>
                        <td>Room Type</td>
                        <td>: ${data.room || ''}</td>
                    </tr>
                    <tr>
                        <td>PHONE</td>
                        <td>: ${data.phone || 'N/A'}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>ADDRESS</td>
                        <td>: ${data.address || 'N/A'}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

                <!-- Additional Info Grid -->
                <table width="100%" cellpadding="3" cellspacing="0" border="1" style="border-collapse: collapse; margin-bottom: 15px; border-color: #ccc;">
                    <tr>
                        <td>COMPANY</td>
                        <td>PERSON</td>
                        <td>E-MAIL</td>
                        <td>CONTACT PERSON</td>
                        <td>PHONE</td>
                    </tr>
                    <tr style="color: #999;">
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>NOT/N/A</td>
                        <td>N/A</td>
                    </tr>
                </table>

                <!-- Room Details -->
                <table width="100%" cellpadding="5" cellspacing="0" border="1" style="border-collapse: collapse; margin-bottom: 15px; border-color: #ccc;">
                    <tr style="background: #f5f5f5;">
                        <th>Service</th>
                        <th>Qty</th>
                        <th>Rate/Night</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td>Room Charge</td>
                        <td>1</td>
                        <td>${data.amount}</td>
                        <td>${data.amount}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align: right;">Total</td>
                        <td>${data.amount}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align: right;">Grand Total</td>
                        <td>${data.amount}</td>
                    </tr>
                </table>

                <!-- Terms -->
                <div style="font-size: 10px; margin-top: 20px;">
                    <p style="font-weight: bold;">Please Note:</p>
                    <ol style="padding-left: 20px; margin: 0;">
                        <li style="margin-bottom: 3px;">Early check-in before 12:00 PM (24 hours 50%) charge will be applicable.</li>
                        <li style="margin-bottom: 3px;">Swimming Pool & Gym - Swimming (8:00 AM - 12:00 PM).</li>
                        <li style="margin-bottom: 3px;">Check in after (12 pm) & check out before (12 pm).</li>
                        <li style="margin-bottom: 3px;">Early check out no refund.</li>
                        <li style="margin-bottom: 3px;">Food property and service damage will be charged.</li>
                    </ol>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
    yield transporter.sendMail({
        from: '"Safa Residency" <safa.residency.bd@gmail.com>', // sender address
        to: email, // list of receivers
        subject, // Subject line.
        html, // html body
    });
});
const sendEmailToAdmin = (email, data, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: config_1.default.sender_email,
            pass: config_1.default.sender_app_password,
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
    <title>Booking Invoice - Safa Residency</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            color: #000;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        td {
            padding: 3px;
            vertical-align: top;
        }
        .form-header {
            font-size: 11px;
            color: #666;
            margin-bottom: 5px;
        }
        .title {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 5px;
            margin-bottom: 15px;
        }
        .grid-item {
            border: 1px solid #ccc;
            padding: 3px;
        }
        .grid-header {
            font-weight: normal;
            background: #f5f5f5;
        }
        .company-info td {
            padding: 2px;
            font-size: 11px;
        }
        .n-a {
            color: #999;
        }
        .terms {
            font-size: 10px;
            margin-top: 20px;
        }
        .terms li {
            margin-bottom: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <table>
            <tr>
                <td style="width: 120px;">
                    <img src="https://i.ibb.co.com/QrSDm0P/logo-safa-removebg-preview.png" alt="Safa Residency" class="logo">
                </td>
                <td>
                    <div class="form-header">Reservation Guest</div>
                </td>
                <td style="text-align: right;">
                    <div class="form-header">Order Date: ${data.orderDate || ''}</div>
                    <div class="form-header">Print Date: ${new Date().toLocaleDateString()}</div>
                    <div class="form-header">Print Time: ${new Date().toLocaleTimeString()}</div>
                </td>
            </tr>
        </table>

        <!-- Company Information -->
        <table class="company-info">
            <tr>
                <td style="width: 120px;">NAME</td>
                <td>: ${data.name || 'N/A'}</td>
                <td>Reservation</td>
                <td>: ${data.id || ''}</td>
            </tr>
            <tr>
                <td>MR_NAMED_FIRST</td>
                <td>: ${data.name || 'N/A'}</td>
                <td>Check In</td>
                <td>: ${data.startDate || ''}</td>
            </tr>
            <tr>
                <td>E-MAIL</td>
                <td>: ${data.email || 'N/A'}</td>
                <td>Check Out</td>
                <td>: ${data.endDate || ''}</td>
            </tr>
            <tr>
                <td>CONTACT PERSON</td>
                <td>: ${data.name || 'N/A'}</td>
                <td>Room Type</td>
                <td>: ${data.room || ''}</td>
            </tr>
            <tr>
                <td>PHONE</td>
                <td>: ${data.phone || 'N/A'}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>ADDRESS</td>
                <td>: ${data.address || 'N/A'}</td>
                <td></td>
                <td></td>
            </tr>
        </table>

        <!-- Grid Container for N/A values -->
        <div class="grid-container">
            <div class="grid-item">COMPANY</div>
            <div class="grid-item">PERON</div>
            <div class="grid-item">E-MAIL</div>
            <div class="grid-item">CONTACT PERSON</div>
            <div class="grid-item">PHONE</div>
            
            <div class="grid-item n-a">N/A</div>
            <div class="grid-item n-a">N/A</div>
            <div class="grid-item n-a">N/A</div>
            <div class="grid-item n-a">NOT/N/A</div>
            <div class="grid-item n-a">N/A</div>
        </div>

        <!-- Room Details Table -->
        <table style="border: 1px solid #ccc;">
            <tr style="background: #f5f5f5;">
                <th style="border: 1px solid #ccc; padding: 5px;">Service</th>
                <th style="border: 1px solid #ccc; padding: 5px;">Qty</th>
                <th style="border: 1px solid #ccc; padding: 5px;">Rate/Night</th>
                <th style="border: 1px solid #ccc; padding: 5px;">Total</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 5px;">Room Charge</td>
                <td style="border: 1px solid #ccc; padding: 5px;">1</td>
                <td style="border: 1px solid #ccc; padding: 5px;">${data.amount}</td>
                <td style="border: 1px solid #ccc; padding: 5px;">${data.amount}</td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: right; border: 1px solid #ccc; padding: 5px;">Total</td>
                <td style="border: 1px solid #ccc; padding: 5px;">${data.amount}</td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: right; border: 1px solid #ccc; padding: 5px;">Grand Total</td>
                <td style="border: 1px solid #ccc; padding: 5px;">${data.amount}</td>
            </tr>
        </table>

        <!-- Terms -->
        <div class="terms">
            <p><strong>Please Note:</strong></p>
            <ol style="padding-left: 20px;">
                <li>Early check-in before 12:00 PM (24 hours 50%) charge will be applicable.</li>
                <li>Swimming Pool & Gym - Swimming (8:00 AM - 12:00 PM).</li>
                <li>Check in after (12 pm) & check out before (12 pm).</li>
                <li>Early check out no refund.</li>
                <li>Food property and service damage will be charged.</li>
            </ol>
        </div>
    </div>
</body>
</html>
  `;
    yield transporter.sendMail({
        from: '"Safa Residency" <safa.residency.bd@gmail.com>', // sender address
        to: email, // list of receivers
        subject, // Subject line.
        html, // html body
    });
});
exports.EmailHelper = {
    sendEmail,
    sendEmailToAdmin,
};
