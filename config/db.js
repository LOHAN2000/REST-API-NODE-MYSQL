import {createPool} from 'mysql2/promise'

export const conn = createPool({
  host: 'localhost',
  user: 'root',
  password: 'HolaAnjhelo1',
  port: 3309,
  database: 'companydb'
})