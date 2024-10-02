import express from 'express'
import { RoomControllers } from './room.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create-room', auth('admin', 'staff'), RoomControllers.createRoom)
router.get('/:id', RoomControllers.getSingleRoom)
router.get('/', RoomControllers.getAllRooms)
router.patch('/:id', auth('admin', 'staff'), RoomControllers.updateRoom)
router.delete('/:id',  auth('admin', 'staff'), RoomControllers.deleteRoom)

export const RoomRoutes = router