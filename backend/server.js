require('dotenv').config()

const axios = require('axios')
const express = require('express')
const port = 6000
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const Crop = require('./models/CropSchema')

app.get('/getcropnames', async (req, res) => {
  const crops = await Crop.find()
  let cropNames = []
  crops.forEach((crop) => {
    cropNames.push(crop.crop)
  })
  // filter duplicates
  cropNames = [...new Set(cropNames)]
  res.send(cropNames)
  
})



app.get('/getcrop/:crop', async (req, res) => {
  const { crop } = req.params
  const crops = await Crop.find({ crop })
  res.send(crops)
})

app.get('/getdiseasenames', async (req, res) => {
  // get the names of all the diseases for all the crops
  const crops = await Crop.find()
  let diseaseNames = []
  crops.forEach((crop) => {
    console.log(crop);
    crop.diseases.forEach((disease) => {
      console.log(disease);
    })
  })
  // filter duplicates
  diseaseNames = [...new Set(diseaseNames)]
  res.send(diseaseNames)

})
app.get('/getdisease/:disease', async (req, res) => {
  const { disease } = req.params

  const crops = await Crop.find({ "diseases.disease": disease })

  res.send(crops)
})

app.get('/getsymptomsnames', async (req, res) => {
  const crops = await Crop.find()
  let symptomNames = []
  crops.forEach((crop) => {
    crop.diseases.forEach((disease) => {
      disease.symptoms.forEach((symptom) => {
        symptomNames.push(symptom)
      })
    })
  })
  res.send(symptomNames)
})

app.get('/getsymptoms/:symptom', async (req, res) => {
  const { symptom } = req.params
  
  const crops = await Crop.find({ "diseases.symptoms": symptom })
  
  res.send(crops)
  
})



mongoose.connect(process.env.DB_URI)
  .then(() => app.listen(port, () => console.log(`Backend server is running`)))
  .catch((error) => console.log(error))
