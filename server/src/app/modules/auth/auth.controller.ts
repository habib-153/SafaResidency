/* eslint-disable @typescript-eslint/no-unused-vars */
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
        data: result.result,
        meta: result.meta
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

const deleteUser = catchAsync(async(req, res)=>{
    const { id } = req.params
    const result = await AuthService.deleteUserFromDB(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User deleted successfully',
        data: null
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

const getAdminStats = catchAsync(async(req, res)=>{
    const result = await AuthService.adminStats()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admin stats retrieved successfully',
        data: result
    })
})

export const AuthController = {
    getToken,
    getAllUser,
    updateUser,
    getUserByEmail,
    deleteUser,
    getAdminStats
}