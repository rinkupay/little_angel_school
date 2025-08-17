const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error")
const path = require("path");

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));
// Static file serving web images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use of Cors
app.use(cors({
    origin: ["https://little-angel-school-client.onrender.com","https://little-angel-school-website.vercel.app","https://littleangelsschool.school","https://little-angel-school-ug9i.vercel.app","http://localhost:4173","http://localhost:5173"],
    methods:["POST","GET","DELETE","PUT","PATCH"],
    credentials: true
}));



// Use of cooki Parser
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(errorMiddleware);

app.get("/",(req,res)=>{
    res.send("<h1> Hello form server</h1>")

})



// Usage Of user Routes
const user = require("./routes/userRoutes");
const student = require("./routes/studentRoutes");
const studentEnquiry = require("./routes/studentEnquiryRoutes");
const payment = require("./routes/paymentRoutes");
const teacher = require("./routes/teacherRoutes");
const teacherPayment = require("./routes/teacherPayment");
const feeSttings = require("./routes/feeSettingsRoutes");
const smsEmailSettings = require("./routes/emailSmsSettingsRoutes");
const schoolDetail = require("./routes/schoolDetailRoutes");
const subscription = require("./routes/subscriptionRoutes");

// WEB ROUTES
const webRoutes = require("./routes/webRoutes");
const webImage = require("./routes/imageRoute");
// SMS Routes
const sms = require("./routes/smsRoutes");

app.use("/api/v1",user);
app.use("/api/v1",student);
app.use("/api/v1",studentEnquiry);
app.use("/api/v1",payment);
app.use("/api/v1",teacher);
app.use("/api/v1",teacherPayment);
app.use("/api/v1",feeSttings);
app.use("/api/v1",smsEmailSettings);
app.use("/api/v1",schoolDetail);
app.use("/api/v1",subscription);
app.use("/api/v1",webRoutes);
app.use("/api/v1",webImage);
app.use("/api/v1",sms);






module.exports = app
