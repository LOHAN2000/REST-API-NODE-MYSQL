import express from 'express'
import dotenv from 'dotenv'
import employeeRoutes from './routes/employee.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "15mb" }));  
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.use('/api/employee', employeeRoutes)

app.use((req, res, next) => {
  res.status(404).json({message: 'Endpoint not found'})
})

app.get('/', (req, res) => {
  res.send('Server is already')
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})