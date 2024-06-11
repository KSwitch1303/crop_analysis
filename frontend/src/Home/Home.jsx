import '../Styles/Home.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
const Home = () => {
  const [isPending, setIsPending] = useState(false)
  const [searchCriteria, setSearchCriteria] = useState('')
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [renderData, setRenderData] = useState([])
  const [render, setRender] = useState(false)

  const getSearch = async () => {
    setIsPending(true)
    const res = await axios.get(`http://localhost:5000/get${searchCriteria}names`)
    setData(res.data)
    // console.log(data)
    setIsPending(false)
  }
  const getCrop = async () => {
    // setIsPending(true)
    // alert(`http://localhost:5000/getcrop/${search}`)
    const res = await axios.get(`http://localhost:5000/getcrop/${search}`)
    // remove duplicates
    const unique = [...new Set(res.data)]
    setRenderData(unique)
    // setIsPending(false)
  }
  const getSymptoms = async () => {
    const res = await axios.get(`http://localhost:5000/getsymptoms/${search}`)
    // remove duplicates
    const unique = [...new Set(res.data)]
    setRenderData(unique)
  }
  useEffect(() => {
    if (searchCriteria) {
      getSearch()
    }
  },[searchCriteria])
  useEffect(() => {
    if (search) {
      setRender(true)
      if (searchCriteria === 'crop') {
        getCrop()
      } else if (searchCriteria === 'symptoms') {
        getSymptoms()
      }

    }
  },[search])
  return ( 
    <div className="home">
      <h1>CROP DISEASE PREVENTION SYSTEM </h1>
      <div className="homeheader">
        <select className='select' disabled={isPending} value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
          <option disabled value="">Select Search criteria</option>
          <option value="crop">Crop</option>
          <option value="symptoms">Symptoms</option>
        </select>
        {searchCriteria && (
          <select className='select1' disabled={isPending} value={search} onChange={(e) => setSearch(e.target.value)}>
            <option disabled value="">Select {searchCriteria}</option>
            <option value="">{searchCriteria} names</option>
            {isPending ? (<option>Loading...</option>) : (
              data.map((item) => <option key={item} value={item}>{item}</option>)
            )}
          </select>
        )}
      </div>
      
      {render ? (
        <div className="cropcards">
          <h3>{}</h3>
          {renderData.map((item) => (
            <div className="cropcard">
              <h1>{item.crop}</h1>
              <p>{item.diseases.map((disease) => (
                <div className="carcontent">
                  <h2>Disease Names: {disease.disease}</h2>
                  <h2>Symptoms</h2>
                  <p>{disease.symptoms.map((symptom) => (
                    <li>{symptom}</li>
                  ))}</p>
                  <h2>Prevention</h2>
                  <p>{disease.prevention}</p>
                  <h2>Cure</h2>
                  <p>{disease.cure}</p>
                </div>
              ))}</p>
            </div>
          ))}
        </div>
      ):null}
      
    </div>
   );
}
 
export default Home;