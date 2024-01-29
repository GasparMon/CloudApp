require('dotenv').config();
const server = require('./app.js')
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})