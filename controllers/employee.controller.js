import {conn} from '../config/db.js'

export class EmployeeController {
  static async getEmployees (req, res) {
    try {
      const result = await conn.query('SELECT "Pong" AS result')
      res.status(200).json(result[0])
    } catch (error) {
      console.log('Error in getEmployees function', error)
      return res.status(500).json({Error: 'Internal server error'})
    }
  }

  static async createEmployee (req, res) {
    try {
      const {name, salary} = req.body

      const result = await conn.query('INSERT INTO employee (employee_name, salary) VALUES (?, ?)', [name, salary])

      res.status(201).json({message: 'Usuario creado correctamente'})

    } catch (error) {
      console.log('Error in function createEmployee', error)
      return res.status(500).json({Error: 'Internal server error'})
    }
  } 
}

