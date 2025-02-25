import express from 'express'
import { EmployeeController } from '../controllers/employee.controller.js'

const router = express.Router()

router.get('/employees', EmployeeController.getEmployees)
router.post('/create', EmployeeController.createEmployee)

export default router;