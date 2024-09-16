import express from 'express'
import { RoomControllers } from './room.controller'

const router = express.Router()

router.post('/create-room', RoomControllers.createRoom)
router.get('/:id', RoomControllers.getSingleRoom)
router.get('/', RoomControllers.getAllRooms)
router.patch('/:id', RoomControllers.updateRoom)
router.delete('/:id', RoomControllers.deleteRoom)

export const RoomRoutes = router