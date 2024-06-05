import { Schema, model } from "mongoose"

const batchSchema = new Schema(
  {
    batch: { type: Number, default: 1, unique: true },
    totalStudent: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const Batch = model('Batch', batchSchema)
export default Batch
