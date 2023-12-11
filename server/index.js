const express = require("express");
const app = express();

require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact")

const db = require("./config/database");
const fileUpload = require("express-fileupload");
const {cloudinaryConnect} = require("./config/cloudinary");

const PORT = process.env.PORT || 4000;

db.dbConnect();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors(
    {
        origin : "*",
        credentials : true,
    })
)
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp"
    })
)
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute)

app.listen(PORT, () => {
    console.log("SERVER STARTED AT PORT :" + `${PORT}`);
})

app.get('/', (req,res)=>{
    return res.json({
        success : true,
        message : " YOUR SERVER IS UP AND RUNNING..."
    })
});