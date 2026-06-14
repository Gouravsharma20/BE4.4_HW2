const {initializeDatabase} = require("./db/db.connection.js")

const express = require("express")

const app = express()

initializeDatabase();

app.use(express.json())

const fs = require("fs")

const Hotel = require("./model/HotelModel.js")
const { error } = require("console")

const jsonData = fs.readFileSync("./data/hotelData.json","utf-8")

app.get("/",(req,res)=>{
    res.json("welcome to my Hotel express app")
})

async function deleteHotels(hotelId) {
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(hotelId)
        return deleteHotel
    } catch(err) {
        console.log("an error occured while deleting hotels")
    }
}

app.delete("/hotels/:hotelId",async(req,res)=>{
    try {
        const hotelsId = req.params.hotelId
        const deletedMovie = await deleteHotels(hotelsId)
        if (!deletedMovie) {
            return res.status(404).json({
                error: "Hotel not found"
            });
        }
        return res.status(200).json({message:"hotel data added successfully",hotelData:deletedMovie})
    } catch(err){
        return res.status(500).json({error:"unable to delete hotels data",errDetails:err.message})
    }
})




async function createHotels(newHotel){
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

// all hotels

async function getAllHotels() {
    try {
        const hotels = await Hotel.find()
        return hotels
    } catch (err) {
        throw err
    }
}


app.get("/hotels", async (req, res) => {
    try {
        const hotels = await getAllHotels()

        return res.status(200).json({
            message: "Hotels fetched successfully",
            hotelsData: hotels
        })
    } catch (err) {
        return res.status(500).json({
            error: "Unable to fetch hotels data",
            errDetails: err.message
        })
    }
})

const hotelData = JSON.parse(jsonData)



const PORT = 7737

app.listen(PORT,()=>{
    console.log(`App is running on Port ${PORT}`)
})


