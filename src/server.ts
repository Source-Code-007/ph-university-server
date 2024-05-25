import mongoose from "mongoose"
import app from "./app"

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`Database connected at port ${process.env.PORT}`)
  } catch (error: any) {
    console.log(error.message)
  }
})
