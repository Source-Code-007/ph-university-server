import { Request, Response } from 'express'
import {
  insertUserToDbService,
  getAllUserService,
  getSingleUserByIdService,
  deleteUserByIdService,
  deleteAllUserService,
  updateUserByIdService,
  statusToggleUserService,
} from './user.service'

const insertUserController = async (req: Request, res: Response) => {
  try {
    const user = await insertUserToDbService(req.body)
    res.status(200).send({
      success: true,
      message: 'User inserted successfully!',
      data: user,
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Error inserting user',
      error: error,
    })
  }
}

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUserService()
    res.status(200).send({
      success: true,
      message: 'Users are retrieved successfully!',
      data: users,
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message ||  'Error fetching all users',
      error: error,
    })
  }
}

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getSingleUserByIdService(req.params?.id)
    if (!user) {
      res.status(404).send({success:false, message: 'User not found', data:user })
      return
    }
    res.status(200).send({
      success: true,
      message: 'User is retrieved successfully!',
      data: user,
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Error fetching user by ID',
      error: error,
    })
  }
}

const deleteUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserByIdService(req.params.id)
    if (!user) {
      res.status(404).send({success:false, message: 'User not found', data:user })
      return
    }
    res.status(200).send({
      success: true,
      message: 'User is deleted successfully!',
      data: user,
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Error deleting user by ID',
      error: error,
    })
  }
}

const deleteAllUsersController = async (req: Request, res: Response) => {
  try {
    const user = await deleteAllUserService()
    res.status(200).send({
      success: true,
      message: 'Users are deleted successfully!',
      data: user,
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Error deleting all users',
      error: error,
    })
  }
}

const updateUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await updateUserByIdService(req.params?.id, req.body)
    if (!user) {
        res.status(404).send({success:false, message: 'User not found', data:user })
      return
    }
    res.status(200).send({ success: true, message: '', data: user })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Error updating user by ID',
      error: error,
    })
  }
}

const toggleUserStatusController = async (req: Request, res: Response) => {
  try {
    const user = await statusToggleUserService(req.params?.id)
    if (!user) {
        res.status(404).send({success:false, message: 'User not found', data:user })
      return
    }
    res.status(200).send({
      success: true,
      message: `${user?.status === 'active' ? 'User activated successfully!' : 'User deactivated successfully!'}`,
      data: user,
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'Error toggling user status',
      error: error,
    })
  }
}

export {
  insertUserController,
  getAllUsersController,
  getUserByIdController,
  deleteUserByIdController,
  deleteAllUsersController,
  updateUserByIdController,
  toggleUserStatusController,
}
