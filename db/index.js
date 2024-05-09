const mongoose = require('mongoose')
const { StringDecoder } = require('string_decoder')

//connect to mongodb
mongoose.connect('your mongodb url')

//define schemas
const UserSchema = new mongoose.Schema({
    username : String,
    password : String
})

const SecretSchema = new mongoose.Schema({
    title : String,
    message : String,
    userMsg :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
}
})

const User = mongoose.model('Users',UserSchema);
const Secret = mongoose.model("Secret",SecretSchema);

module.exports = {
    User,
    Secret
}