
const dotenv = require('dotenv')
const app = require("./app");
const connectDB = require('./utils/connectDB')

dotenv.config()

connectDB(process.env.MONGO_DB_LOCAL)
    .then(()=>{
        console.log("The data base has been connected");
    })
    .catch(err=> console.log(err.message))
const port = process.env.PORT ||8000

const server = app.listen(port, process.env.HOSTNAME , ()=>{
    console.log(`Server is listening on port ${port}`);
})