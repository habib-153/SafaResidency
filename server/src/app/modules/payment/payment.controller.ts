import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const confirmationController = catchAsync(async (req, res) => {
    const { status } = req.query;
    const data = req.body;
    //console.log(data, 'data')
  
    const result = await paymentServices.confirmationService(
      data, status as string
    );
    res.send(result);
  });
  
  export const paymentController = {
    confirmationController,
  };