const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
}).then(() => console.log('Connection Succesful'))
.catch((err) => console.log(err));