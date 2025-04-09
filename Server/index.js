const express = require("express")
const app = express();

// import all routes 
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/payment");
const courseRoutes = require("./routes/Course");

// !! const contactUsRoute = require("./routes/Contact");

const database = require("./config/dataBase")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {cloudineryConnect} = require("./config/cloudinery")
const fileUpload = require("express-fileupload")
require("dotenv").config();

const PORT = process.env.PORT || 4000

//DATABASE Connection  
database.dbconnect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
);

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
);

cloudineryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

app.get('/' , (req,res) => {
   res.send("Hello Ji Ye hai aapka default Route")
});

app.listen(PORT , () => {
    console.log(`App Is SuccessFully Running At Port ${PORT}`);
    
});