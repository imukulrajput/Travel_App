const express = require("express");
const mongoose = require("mongoose"); 
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();



const hotelDataAddedToDBRouter = require("./routes/dataimport.router")
const categoryAddedToDBRouter = require("./routes/categoryimport.router")

const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/cateegory.router");
const singleHotelRouter = require("./routes/singlehotel.router");
const authRouter = require("./routes/auth.router");
const wishlistRouter = require("./routes/wishlist.router");

const connectDB = require("./config/dbconfig");

const app = express();

app.use((cors()));
app.use(express.json());
connectDB();

const PORT = 8080;



app.get("/",(req,res)=>{
     res.send("Hello Greeks");
})

app.use("/api/hoteldata",hotelDataAddedToDBRouter);
app.use("/api/categorydata",categoryAddedToDBRouter);
app.use("/api/hotels",hotelRouter);
app.use("/api/category",categoryRouter);
app.use("/api/hotels",singleHotelRouter);
app.use("/api/auth",authRouter);
app.use("/api/wishlist",wishlistRouter);

mongoose.connection.once("open",()=>{
    console.log("connected to DB");
    app.listen(process.env.PORT || PORT,()=>{
        console.log("Server is Up and Running")
   })
})

