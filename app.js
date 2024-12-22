import express from 'express'
import { getUsersData, getUser, insertRecord } from './database.js'
//import { connectToDatabase } from './database.js'
import mysql from 'mysql2'
import path from 'path'
import { fileURLToPath } from 'url';


const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = import.meta.dirname



const dbConfig = {
  host: process.env.HOST,
  user: "root",
  password: "password",
  database: "mysql_table"
}

const csvData = [
  { firstName: "John", lastName: "Doe", age: 30, email: "johndoe@example.com", phone: "0893216548", eircode: "1YR5DD" },
  { firstName: "Jane", lastName: "Smith", age: 29, email: "janesmith@example.com", phone: "0892856548", eircode: "8MH7WE" },
  { firstName: "Michael", lastName: "Johnson", age: 25, email: "michaeljohnson@example.com", phone: "0898523694", eircode: "7RP0RR" },
  { firstName: "Tommy", lastName: "Bean", age: 35, email: "michaeljohnson@example.com", phone: "0894859612", eircode: "EYR5DD" }
];

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/form.html'));
});


app.get("/userdata", async (req, res) => {
    const userdata = await getUsersData()
    res.send(userdata)
})

app.get("/userdata/:id", async (req, res) => {
    const id = req.params.id
    const userdata = await getUser(id)
    res.send(userdata)
})


app.post('/api/userdata', async (req, res) => {
  try {
      const { firstName, lastName, age, email, phone, eircode } = req.body;
      
      // Validate the incoming data
      validateRecord({firstName, lastName, age, email, phone, eircode}, 0);
      
      // Insert into database
      const result = await insertRecord(firstName, lastName, age, email, phone, eircode);
      
      res.status(201).json(result);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


// Validation rules
function validateRecord(record, index) {
  const nameRegex = /^[a-zA-Z0-9]{1,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const eircodeRegex = /^[A-Za-z0-9]{6}$/;

  if (!nameRegex.test(record.firstName) || !nameRegex.test(record.lastName)) {
    throw new Error(`Validation failed at record ${index}: Invalid name.`)
  }
  if (!emailRegex.test(record.email)) {
    throw new Error(`Validation failed at record ${index}: Invalid email.`)
  }
  if (!phoneRegex.test(record.phone)) {
    throw new Error(`Validation failed at record ${index}: Invalid phone number.`)
  }
  if (!eircodeRegex.test(record.eircode)) {
    throw new Error(`Validation failed at record ${index}: Invalid eircode.`);
  }
}

// Insert valid records into the database
async function insertValidRecords(data, connection) {

  for (const [index, record] of data.entries()) {

      try {
          connection = await mysql.createConnection(dbConfig)

          validateRecord(record, index);
          const query = `INSERT INTO userdata (first_name, last_name, age, email, phone, eircode)
                        VALUES (?, ?, ?, ?, ?, ?)`;
          const values = [record.firstName, record.lastName, record.age, record.email, record.phone, record.eircode];
          
          await connection.execute(query, values);
          console.log(`Record ${index} inserted successfully.`);
      } catch (err) {
          console.error(err.message);
      }
  }
}


async function initializeApp() {
  try {
      console.log('Database connected successfully.');
      
      // Only insert records after connection is established
      await insertValidRecords(csvData);
      
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
          console.log(`Fill the form.html on http://localhost:3000/`)
      });
  } catch (error) {
      console.error('Failed to connect to database:', error);
      process.exit(1);
  }
}


insertValidRecords(csvData);

initializeApp()


// app.get("./submit", async (req, res) => {
//   try {
//       const { firstName, lastName, age, email, phone, eircode } = req.body;
      
//       // Validate the incoming data
//       validateRecord({firstName, lastName, age, email, phone, eircode}, 0);
      
//       // Insert into database
//       const result = await insertRecord(firstName, lastName, age, email, phone, eircode)
      
//       res.status(201).json(result);
//   } catch (error) {
//       res.status(400).json({ error: error.message })
//   }
// })




app.listen (PORT, () => {})