import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const getToken = catchAsync(async(req, res) => {
    const { user , token} = await AuthService.getToken(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token generated successfully",
        token: token,
        data: user
    })
})

const getAllUser = catchAsync(async(req, res) => {
    const result = await AuthService.getAllUserFromDB(req.query)
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All users retrieved successfully',
        data: result
    })
})

const updateUser = catchAsync(async(req, res)=>{
    const { id } = req.params
    const result = await AuthService.updateUserIntoDB(req.body, id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User updated successfully',
        data: result
    })
})

const getUserByEmail = catchAsync(async(req, res)=>{
    const { email } = req.params
    const result = await AuthService.getUserFromDB(email)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User retrieved successfully',
        data: result
    })
})

export const AuthController = {
    getToken,
    getAllUser,
    updateUser,
    getUserByEmail
}