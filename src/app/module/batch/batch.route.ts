import { Router } from "express"
import { batchController } from "./batch.controller"

const router = Router()

router.post(
  '/',
  batchController.insertBatch,
)
router.get('/', batchController.getAllBatches)
router.get('/:id', batchController.getBatchById)

export { router as batchRouter }
