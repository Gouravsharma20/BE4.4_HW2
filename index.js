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

async function updateHotel(hotelId,dataToUpdate) {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId,dataToUpdate,{new:true})
        if (!updateHotel) {
            console.log("updated data is not available")
        }
        return updatedHotel
    } catch (err) {
        console.log("an error occured while updating hotel data")
    }
}

app.post("/hotels/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const updatedData = await updateHotel(id,req.body)
        if (!updatedData) {
            return res.status(404).json({error:"data not founds",errorDetails:err.message})
        } else {
            return res.status(200).json({message:"data updated successfully",updatedRestraunt:updatedData})
        }

    } catch(err) {
        return res.status(500).json({error:"an unexpected error occured while updating hotel api",errorDetails:err.message})
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



const PORT = 7741

app.listen(PORT,()=>{
    console.log(`App is running on Port ${PORT}`)
})


