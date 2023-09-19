import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import PopUp from './Popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [data, setData] = useState({
    date: null,
    name: ""
  })
  const [getAllDataJson, setAllDataJson] = useState()
  const [startDate, setStartDate] = useState(new Date());
  // console.log(myEpoch,"myEpoch")
  const [popUpState, setPopUpState] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const epochConvertor = (date) => {
    var myDate = new Date(date); // Your timezone!
    var myEpoch = myDate.getTime() / 1000.0;
    return myEpoch
  }
  const handleSubmit = (e,type) => {
    e.preventDefault()
     data.date = epochConvertor(startDate)
     if(type==="update"){
      console.log(data._id)
      axios.put(`http://localhost:4000/api/updateDatePicker/${data._id}`, data)
      .then((res) => {
        console.log(res)
        getAllData()
        setPopUpState(false)
      })
      .catch((err) => {
        console.log(err)
      })
     }else{
      axios.post("http://localhost:4000/api/AddDatePicker", data)
      .then((res) => {
        console.log(res)
        getAllData()
        setPopUpState(false)
      })
      .catch((err) => {
        console.log(err)
      })
     }
   
  }
  const getAllData = () => {
    axios.get("http://localhost:4000/api/getAllDatePicker")
      .then((res) => {
        res.data.data.forEach((v)=>{
          let date=new Date(v.date*1000).toLocaleDateString()
          v.showDate= date
        })
        console.log(res)
        setAllDataJson(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handlePopup = () => {
    setPopUpState(!popUpState)
  }
  const handleDelete = (v,i) =>{
    console.log(v?._id)
    axios.delete(`http://localhost:4000/api/deleteDatePicker/${v?._id}`)
    .then((res) => {
      console.log(res)
      // setAllDataJson(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  const handleEdit = (v, i) => {
    var myDate = new Date( v.date *1000);
    setStartDate(myDate)
    setData(v)
    setPopUpState(true)
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <div className="App">

      <button onClick={() => handlePopup()}>Add</button>
      <PopUp state={popUpState} handleClick={handlePopup} >
        <form className='p-6'>
          <input type="text" value={data.name} name="name" className='w-full border' onChange={(e) => handleChange(e)} />
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <button onClick={(e) => handleSubmit(e,"submit")}>Submit</button>
          <button onClick={(e) => handleSubmit(e,"update")}>Update</button>
        </form>
      </PopUp>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {getAllDataJson?.map((v, i) => {
            return (
              <tr>
                <td>{i}</td>
                <td>{v?.showDate}</td>
                <td>{v?.name}</td>
                <td><button onClick={() => handleEdit(v, i)}>Edit</button></td>
                <td><button onClick={() => handleDelete(v, i)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
