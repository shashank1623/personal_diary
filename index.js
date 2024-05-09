const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const userRouter = require('./routes/users')

//Middleware for parsing request bodies
app.use(bodyParser.json());

app.get('/',function (req,res){
    res.send("Hello World!")
});
app.use('/user',userRouter)

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})