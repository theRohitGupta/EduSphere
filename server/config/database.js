const mongoose = require('mongoose');
require("dotenv").config();


exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => console.log("DB CONNECTED SUCESSFULLY"))
    .catch((err) => {
        console.log("DB CONNECTION FAILED");
        console.error(err);
        process.exit(1);
    })
};