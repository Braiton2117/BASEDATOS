import {createPool} from "mysql2/promise";
import {BD_HOST,BD_PASSWORD,BD_DATABASE,BD_PORT,BD_USER} from './config.js'
export const conmysql=createPool({
    host: BD_HOST,
    database: BD_DATABASE,
    user: BD_USER,
    password:BD_PASSWORD,
    port:BD_PORT
})