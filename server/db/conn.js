const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndMod: false, // this is not supported
}).then(()=>{
    console.log('Connection successful');
}).catch(()=>{
    console.log('No connection')
})