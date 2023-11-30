import { Router } from 'express'
import { createRoom, getAllRooms, getRoom, updateRoom } from '@/controllers/rooms.controller'

export const roomsRouter = () => {
  const roomsRouter = Router()

  roomsRouter.route('/rooms')
    .get(getAllRooms)
    .post(createRoom)

  roomsRouter.route('/rooms/:id')
    .get(getRoom)
    .put(updateRoom)

  return roomsRouter
}
