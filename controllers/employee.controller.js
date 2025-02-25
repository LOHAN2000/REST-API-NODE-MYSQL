import {conn} from '../config/db.js'

export class EmployeeController {
  static async getEmployees (req, res) {
    try {
      const result = await conn.query('SELECT * FROM  employee')
      res.status(200).json(result[0])
    } catch (error) {
      console.log('Error in getEmployees function', error)
      return res.status(500).json({error: 'Internal server error'})
    }
  }

  static async getEmployeeById (req, res) {
    try {
      const {id} = req.params

      if (!id) {
        return res.status(400).json({error: 'Id necesario'})
      }

      const [rows] = await conn.query('SELECT * FROM employee WHERE employee_id = ?', [id],)

      if (rows.length === 0) {
        return res.status(404).json({error: 'Empleado no encontrado'})
      }
      res.status(200).json(rows)
    } catch (error) {
      console.log('Error in function getEmployeeId', error)
      return res.status(500).json('Internal server error')
    }
  }

  static async createEmployee (req, res) {
    try {
      const {name, salary} = req.body

      if (!name) {
        return res.status(400).json({error: 'El campo name es necesario'})
      }

      const result = await conn.query('INSERT INTO employee (employee_name, salary) VALUES (?, ?)', [name, salary])

      res.status(201).json({message: 'Usuario creado correctamente'})

    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.sqlMessage.includes('employee_name')) {
          return res.status(409).json({error: 'El nombre ya está en uso'})
        }
        return res.status(409).json({error: 'Entrada duplicada'})
      }
      return res.status(500).json({error: 'Internal server error'})
    }
  } 

  static async updateEmployee (req, res) {
    try {
      const {id} = req.params
      const {name, salary} = req.body

      if (!id) {
        return res.status(400).json({error: 'Id necesario'})
      }

      if (!name && !salary) {
        return res.status(400).json({error: 'Ingrese '})
      }


    } catch (error) {
      console.log('Error in function updateEmployee', error)
      return res.status(500).json({error: 'Internal server error'})
    }
  }

  static async deleteEmployee (req, res) {
    try {
      const {id} = req.params

      const result = await conn.query('DELETE FROM employee WHERE employee_id = ?', [id])

      if (result[0].affectedRows === 0) {
        return res.status(404).json({error: 'Empleado no encontrado'})
      }

      res.status(200).json({message: 'Empleado eliminado correctamente'})

    } catch (error) {
      console.log('Error in function deleteEmployee', error)
      return res.status(500).json('Internal server error')
    }
  }
}

