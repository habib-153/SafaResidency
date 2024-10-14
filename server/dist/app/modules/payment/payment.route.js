"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post('/confirmation', payment_controller_1.paymentController.confirmationController);
// router.post('/ipn', async (req: Request, res: Response) => {
//     const ipnData = req.body;
//     // Validate the IPN data
//     try {
//       const validationResponse = await validateTransaction(ipnData.val_id);
//         console.log(validationResponse, 'validationResponse')
//       if (validationResponse.status === 'VALID' && validationResponse.amount === ipnData.amount) {
//         // Update your database with the transaction status
//         // await Payment.updateOne(
//         //   { transactionId: ipnData.tran_id },
//         //   { $set: { paidStatus: true, validationData: validationResponse } }
//         // );
//         res.status(200).send('Payment validated and updated successfully.');
//       } else {
//         res.status(400).send('Invalid payment data.');
//       }
//     } catch (error) {
//       console.error('Validation failed:', error);
//       res.status(500).send('Validation failed.');
//     }
//   });
exports.PaymentRoutes = router;
