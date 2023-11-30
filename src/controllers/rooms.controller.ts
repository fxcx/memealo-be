import { HttpStatus } from '../helpers/httpStatus'
import { roomService } from '@/services/rooms'
import type { Request, Response, NextFunction } from 'express'

const getAllRooms = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await roomService.getAll()
    return HttpStatus.OK(res, rooms)
  } catch (error) {
    next(error)
  }
}

const getRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const rooms = await roomService.getOne(id)
    return HttpStatus.OK(res, rooms)
  } catch (error) {
    next(error)
  }
}

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await roomService.create(req.body)
    return HttpStatus.CREATED(res, rooms)
  } catch (error) {
    next(error)
  }
}

const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { body } = req.body
    const rooms = await roomService.update(id, body)
    return HttpStatus.OK(res, rooms)
  } catch (error) {
    next(error)
  }
}

export {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom
}
