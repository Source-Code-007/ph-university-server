import { Router } from "express";
import { deleteAllUsersController, deleteUserByIdController, getAllUsersController, getUserByIdController, toggleUserStatusController, updateUserByIdController } from "./user.controller";

const router = Router()

router.get('/', getAllUsersController)
router.get('/:id', getUserByIdController)
router.delete('/', deleteAllUsersController)
router.delete('/:id', deleteUserByIdController)
router.patch('/:id', updateUserByIdController)
router.patch('/status/:id', toggleUserStatusController)



export {router as userRoute}