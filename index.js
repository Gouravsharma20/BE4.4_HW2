const {initializeDatabase} = require("./db/db.connection.js")

const express = require("express")

const app = express()

app.use(express.json())

const fs = require("fs")

const Hotel = require("./model/HotelModel.js")
const { error } = require("console")

const jsonData = fs.readFileSync("./data/hotelData.json","utf-8")

app.get("/",(req,res)=>{
    res.json("welcome to my Hotel express app")
})




async function createHotels(newHotel){
    await initializeDatabase()
    try{
        const hotel = new Hotel(newHotel)
        const saveHotel = await hotel.save()
        return saveHotel
    } catch(err) {
        console.log("Error loading Hotels",err)
    }
}

app.post("/hotels",async(req,res)=>{
    try {
        const addedHotel = await createHotels(req.body)
        return res.status(201).json({message:"new Hotel Added successfully",hotelData:addedHotel})
    } catch(err){
        return res.status(500).json({error:"an erro occured while adding hotels"})
    }
})

const hotelData = JSON.parse(jsonData)


const PORT = 7726

app.listen(PORT,()=>{
    console.log(`App is running on Port ${PORT}`)
})


