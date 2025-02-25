import express from 'express'
import { EmployeeController } from '../controllers/employee.controller.js'

const router = express.Router()

router.get('/employees', EmployeeController.getEmployees)
router.get('/employee/:id', EmployeeController.getEmployeeById)
router.post('/create', EmployeeController.createEmployee)
router.delete('/employee/:id', EmployeeController.deleteEmployee)

export default router;