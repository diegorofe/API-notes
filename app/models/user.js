const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


let userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
})


userSchema.pre('save', function(next){
    if(this.isNew || this.isModefied('password')){
        bcrypt.hash(this.password, 10,
            (error, hashedPassword) => {
                if(error)
                    next(error)
                else{
                    this.password = hashedPassword;
                    next();
                }
            })
    }
})

userSchema.methods.isCorrectPasword = function (password, callback) {

    bcrypt.compare(password, this.password, function(err, same){
        if(err)
            callback(err)
        else
            callback(err, same)
    })

}

module.exports = mongoose.model('User', userSchema)