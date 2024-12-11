// Simulated CSV Data
// Name, Age, Email, Phone Number, Eircode
var express = require('express')
const app = express
const PORT = 5500;

app.get ('/', (req, res) => {
    res.send('Hello, world!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    
})

const csvData = `"John, Doe",30,"johndoe@example.com, 0893216548, 1YR5DD"
"Jane, Smith","janesmith@example.com, 0892856548, 8MH7WE"
"Michael, Johnson","michaeljohnson@example.com, 0898523694, 7RP0RR"
"Tommy, Bean","michaeljohnson@example.com, 0894859612, EYR5DD"`