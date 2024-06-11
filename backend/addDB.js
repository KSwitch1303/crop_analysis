require('dotenv').config()

const axios = require('axios')
const express = require('express')
const port = 5000
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const Crop = require('./models/CropSchema')

const cropdata = [
  {
    "crop": "Yam",
    "diseases": [
      {
        "disease": "Yam Anthracnose",
        "symptoms": ["Dark lesions on leaves", "Sunken spots on tubers"],
        "prevention": "Rotate crops regularly",
        "cure": "Use fungicides"
      },
      {
        "disease": "Yam Mosaic Virus",
        "symptoms": ["Mottling and yellowing of leaves", "Reduced tuber yield"],
        "prevention": "Control aphid vectors",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Yam Rots",
        "symptoms": ["Soft, watery lesions on tubers", "Foul odor"],
        "prevention": "Harvest in dry conditions",
        "cure": "None, remove infected plants"
      }
    ]
  },
  {
    "crop": "Cassava",
    "diseases": [
      {
        "disease": "Cassava Mosaic Disease",
        "symptoms": ["Yellowing and curling of leaves", "Stunted growth"],
        "prevention": "Plant resistant varieties",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Cassava Bacterial Blight",
        "symptoms": ["Water-soaked lesions on leaves", "Wilting of shoots"],
        "prevention": "Use disease-free planting material",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Cassava Anthracnose",
        "symptoms": ["Dark lesions on leaves and stems", "Premature leaf drop"],
        "prevention": "Improve field drainage",
        "cure": "Use fungicides"
      }
    ]
  },
  {
    "crop": "Rice",
    "diseases": [
      {
        "disease": "Rice Blast",
        "symptoms": ["Irregular lesions on leaves", "Reduced grain yield"],
        "prevention": "Maintain proper drainage",
        "cure": "Use fungicides"
      },
      {
        "disease": "Sheath Blight",
        "symptoms": ["White lesions on sheaths", "Reduced tillering"],
        "prevention": "Avoid excessive nitrogen fertilization",
        "cure": "Use fungicides"
      },
      {
        "disease": "Rice Brown Spot",
        "symptoms": ["Brown lesions with yellow halos on leaves", "Reduced grain quality"],
        "prevention": "Plant resistant varieties",
        "cure": "Use fungicides"
      }
    ]
  },
  {
    "crop": "Maize (corn)",
    "diseases": [
      {
        "disease": "Maize Stalk Rot",
        "symptoms": ["Soft and discolored stalks", "Wilting of leaves"],
        "prevention": "Avoid planting in waterlogged soils",
        "cure": "No cure, remove affected plants"
      },
      {
        "disease": "Maize Grey Leaf Spot",
        "symptoms": ["Gray lesions on leaves", "Reduced yield"],
        "prevention": "Rotate crops with non-host plants",
        "cure": "Use fungicides"
      },
      {
        "disease": "Maize Rust",
        "symptoms": ["Orange powdery pustules on leaves", "Reduced photosynthesis"],
        "prevention": "Plant resistant varieties",
        "cure": "Use fungicides"
      }
    ]
  },
  {
    "crop": "Sorghum",
    "diseases": [
      {
        "disease": "Sorghum Head Smut",
        "symptoms": ["Large, black masses replace the grain", "Stunted growth"],
        "prevention": "Use certified disease-free seeds",
        "cure": "No cure, remove infected plants"
      },
      {
        "disease": "Sorghum Anthracnose",
        "symptoms": ["Dark lesions on leaves and stems", "Premature leaf drop"],
        "prevention": "Improve field drainage",
        "cure": "Use fungicides"
      },
      {
        "disease": "Sorghum Downy Mildew",
        "symptoms": ["White downy growth on leaves", "Reduced yield"],
        "prevention": "Avoid overhead irrigation",
        "cure": "Use fungicides"
      }
    ]
  },
  {
    "crop": "Millet",
    "diseases": [
      {
        "disease": "Millet Blast",
        "symptoms": ["Spots and lesions on leaves and stems", "Reduced yield"],
        "prevention": "Rotate crops with non-host plants",
        "cure": "Use fungicides"
      },
      {
        "disease": "Millet Downy Mildew",
        "symptoms": ["White downy growth on leaves", "Reduced yield"],
        "prevention": "Improve field drainage",
        "cure": "Use fungicides"
      },
      {
        "disease": "Millet Ergot",
        "symptoms": ["Black fungal bodies replace seeds", "Reduced yield"],
        "prevention": "Remove and burn infected plants",
        "cure": "No cure, remove infected plants"
      }
    ]
  },
  {
    "crop": "Soybeans",
    "diseases": [
      {
        "disease": "Soybean Rust",
        "symptoms": ["Brown or tan lesions on leaves", "Defoliation"],
        "prevention": "Plant resistant varieties",
        "cure": "Use fungicides"
      },
      {
        "disease": "Soybean Root Rot",
        "symptoms": ["Brown and rotted roots", "Stunted growth"],
        "prevention": "Improve field drainage",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Soybean Cyst Nematode",
        "symptoms": ["Stunted growth", "Yellowing of leaves"],
        "prevention": "Rotate crops with non-host plants",
        "cure": "Nematicides"
      }
    ]
  },
  {
    "crop": "Benniseed (Sesame)",
    "diseases": [
      {
        "disease": "Sesame Fusarium Wilt",
        "symptoms": ["Yellowing and wilting of leaves", "Stunted growth"],
        "prevention": "Use disease-free seeds",
        "cure": "No cure, remove infected plants"
      },
      {
        "disease": "Sesame Leaf Spot",
        "symptoms": ["Circular lesions with dark margins on leaves", "Defoliation"],
        "prevention": "Plant resistant varieties",
        "cure": "Use fungicides"
      },
      {
        "disease": "Sesame Root Rot",
        "symptoms": ["Brown, water-soaked lesions on roots", "Stunted growth"],
        "prevention": "Improve field drainage",
        "cure": "None, remove infected plants"
      }
    ]
  },
  {
    "crop": "Groundnut (Peanuts)",
    "diseases": [
      {
        "disease": "Groundnut (Peanut) Leaf Spot",
        "symptoms": ["Circular brown spots on leaves", "Defoliation"],
        "prevention": "Rotate crops with non-host plants",
        "cure": "Use fungicides"
      },
      {
        "disease": "Groundnut (Peanut) Rust",
        "symptoms": ["Rusty pustules on leaves and stems", "Reduced yield"],
        "prevention": "Plant resistant varieties",
        "cure": "Use fungicides"
      },
      {
        "disease": "Groundnut (Peanut) Pod Rot",
        "symptoms": ["Dark lesions on pods", "Pod decay"],
        "prevention": "Harvest in dry conditions",
        "cure": "None, remove infected plants"
      }
    ]
  },
  {
    "crop": "Beans (Cowpeas)",
    "diseases": [
      {
        "disease": "Cowpea Powdery Mildew",
        "symptoms": ["White powdery patches on leaves", "Reduced yield"],
        "prevention": "Improve airflow and reduce humidity",
        "cure": "Use fungicides"
      },
      {
        "disease": "Cowpea Aphid-borne Mosaic Virus",
        "symptoms": ["Mottling and curling of leaves", "Stunted growth"],
        "prevention": "Control aphid vectors",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Cowpea Root Rot",
        "symptoms": ["Brown, water-soaked lesions on roots", "Stunted growth"],
        "prevention": "Improve field drainage",
        "cure": "None, remove infected plants"
      }
    ]
  },
  {
    "crop": "Vegetables",
    "diseases": [
      {
        "disease": "Tomato Blight",
        "symptoms": ["Brown spots on leaves", "Rotting of fruits"],
        "prevention": "Space plants for better airflow",
        "cure": "Use fungicides"
      },
      {
        "disease": "Pepper Anthracnose",
        "symptoms": ["Dark lesions on stems and fruits", "Premature fruit drop"],
        "prevention": "Plant resistant varieties",
        "cure": "Use fungicides"
      },
      {
        "disease": "Okra Yellow Vein Mosaic",
        "symptoms": ["Yellowing and vein clearing on leaves", "Stunted growth"],
        "prevention": "Control aphid vectors",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Onion Downy Mildew",
        "symptoms": ["White fuzzy growth on leaves", "Reduced bulb size"],
        "prevention": "Avoid overhead irrigation",
        "cure": "Use fungicides"
      },
      {
        "disease": "Spinach Leaf Spot",
        "symptoms": ["Brown or black spots on leaves", "Leaf wilting"],
        "prevention": "Practice crop rotation",
        "cure": "Use fungicides"
      }
    ]
  },
  {
    "crop": "Fruits",
    "diseases": [
      {
        "disease": "Citrus Canker",
        "symptoms": ["Raised lesions on leaves and fruits", "Premature fruit drop"],
        "prevention": "Prune infected branches",
        "cure": "Use copper-based fungicides"
      },
      {
        "disease": "Banana Fusarium Wilt (Panama Disease)",
        "symptoms": ["Yellowing and wilting of leaves", "Premature ripening of fruits"],
        "prevention": "Plant resistant cultivars",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Pineapple Fusarium Wilt",
        "symptoms": ["Yellowing and wilting of leaves", "Stunted growth"],
        "prevention": "Plant disease-free pineapple suckers",
        "cure": "No cure, remove infected plants"
      },
      {
        "disease": "Guava Anthracnose",
        "symptoms": ["Dark lesions on leaves and fruits", "Premature fruit drop"],
        "prevention": "Prune to improve airflow",
        "cure": "Use copper-based fungicides"
      },
      {
        "disease": "Watermelon Fusarium Wilt",
        "symptoms": ["Yellowing and wilting of leaves", "Stunted growth"],
        "prevention": "Use disease-resistant varieties",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Papaya Ringspot Virus",
        "symptoms": ["Yellowing and mottling of leaves", "Deformed fruits"],
        "prevention": "Use virus-free planting materials",
        "cure": "None, remove infected plants"
      }
    ]
  },
  {
    "crop": "Others",
    "diseases": [
      {
        "disease": "Sugarcane Smut",
        "symptoms": ["Black fungal growth on stems", "Reduced sugar content"],
        "prevention": "Plant disease-free seed cane",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Melon Powdery Mildew",
        "symptoms": ["White powdery growth on leaves", "Reduced yield"],
        "prevention": "Improve airflow and reduce humidity",
        "cure": "Use fungicides"
      },
      {
        "disease": "Plantain Black Sigatoka",
        "symptoms": ["Large black spots on leaves", "Reduced yield"],
        "prevention": "Spray with fungicides preventatively",
        "cure": "Use fungicides"
      },
      {
        "disease": "Cocoa Pod Rot",
        "symptoms": ["Brown lesions on pods", "Premature pod drop"],
        "prevention": "Prune to improve airflow",
        "cure": "Use fungicides"
      },
      {
        "disease": "Sweet Potato Wilt",
        "symptoms": ["Yellowing and wilting of leaves", "Stunted growth"],
        "prevention": "Plant resistant varieties",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Cocoyam Leaf Blight",
        "symptoms": ["Brown spots on leaves", "Leaf yellowing"],
        "prevention": "Plant disease-free corms",
        "cure": "Use fungicides"
      },
      {
        "disease": "Achi Root Rot",
        "symptoms": ["Root rot", "Stunted growth"],
        "prevention": "Plant in well-drained soil",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Pigeon Pea Wilt",
        "symptoms": ["Yellowing and wilting of leaves", "Stunted growth"],
        "prevention": "Plant resistant varieties",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Tiger Nut Root Rot",
        "symptoms": ["Root rot", "Stunted growth"],
        "prevention": "Plant in well-drained soil",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Ginger Rhizome Rot",
        "symptoms": ["Soft and discolored rhizomes", "Stunted growth"],
        "prevention": "Rotate crops regularly",
        "cure": "None, remove infected plants"
      },
      {
        "disease": "Hibiscus Leaf Spot",
        "symptoms": ["Brown spots on leaves", "Defoliation"],
        "prevention": "Improve airflow and reduce humidity",
        "cure": "Use fungicides"
      },
      {
        "disease": "Cashew Anthracnose",
        "symptoms": ["Dark lesions on leaves and fruits", "Premature fruit drop"],
        "prevention": "Prune to improve airflow",
        "cure": "Use copper-based fungicides"
      },
      {
        "disease": "Moringa Leaf Spot",
        "symptoms": ["Brown spots on leaves", "Defoliation"],
        "prevention": "Remove infected leaves",
        "cure": "Use fungicides"
      }
    ]
  }
]
const result = []
const splitCropData = () => {
  console.log(cropdata.length);
  for (let j = 0; j < cropdata.length; j++) {
    for (let i = 0; i < cropdata[j].diseases.length; i++) {
      result.push({ crop: cropdata[j].crop, diseases: cropdata[j].diseases[i] })
    }
  }
  return result
}

app.get('/addcropdata', async (req, res) => {

  res.send(splitCropData())
})


const createCropData = async () => {

  for (let i = 0; i < result.length; i++) {

    const crop = new Crop(result[i])

    await crop.save()
  }
}


const start = async () => {
  console.log('Started');
  try {
    splitCropData()
    createCropData()
  } catch (error) {
    console.log(error)
  }
}
// mongoose.connect(process.env.DB_URI)
//   .then(() => app.listen(port, () => console.log(`Backend server is running`)))
//   .catch((error) => console.log(error))
mongoose.connect(process.env.DB_URI)
  .then(() => start())
  .catch((error) => console.log(error))
// start()
// app.listen(port, () => console.log(`Backend server is running`))