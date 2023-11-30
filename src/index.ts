import express from 'express'
import { roomsRouter } from '@/routes/rooms'
import { errorHandler } from '@/middlewares/errorHandler'
// import cors from 'cors'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())

// app.use(cors())

app.use('/api', roomsRouter())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
