import mysql from 'mysql2'

const pool  = mysql.createPool({
    host: process.env.HOST,
    user: "root",
    password: "password",
    database: "mysql_table"
}).promise()


export async function getUsersData() {
    const [rows] = await pool.query("SELECT * FROM userdata")
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM userdata
        WHERE id = ?
        `, [id])
    return rows
}

export async function insertRecord(first_name, last_name, age, email, phone, eircode) {
    const [result] = await pool.query(`
        INSERT INTO userdata (first_name, last_name, age, email, phone, eircode)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [first_name, last_name, age, email, phone, eircode])
    const id = result.insertId;
    return getUser(id)
}
