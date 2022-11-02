import React, {useState} from 'react'
import {UilSearch, UilLocationPoint} from '@iconscout/react-unicons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState('')
  const handleSearchClick = () => {
    if (city !== "") setQuery({q:city})
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) setUnits(selectedUnit)
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching users location.')
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        toast.success("Location fetched.")

        setQuery({
          lat,
          lon,
        })
      })
    }

  }
  return (
    <div classname ='flex flex-row justify-center my-6'>
        <div className ='flex flew-row w-3/4 items-center justify-center space-x-4'>
            <input 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text" 
            placeholder='Search....'
            className="text-xl font-light p-2 focus:outline-none capitalize" />
            <UilSearch
             size={25} 
             className="text-white cursor-pointer transition ease-out hover:scale-125" 
             onClick ={handleSearchClick}/>
             
            <UilLocationPoint 
             size={25} 
             className="text-white cursor-pointer transition ease-out hover:scale-125" 
             onClick ={handleLocationClick}/>
            
        </div>
        <div
            className="flex flex-row w-2/4 items-center justify-center">
            <button 
             name="metric" 
             className='text-xl text-white cursor-pointer transition ease-out hover:scale-125'
             onClick={handleUnitsChange}>°C |</button>
            <p
             className="text-xl text-white mx-1 ">

            </p>
            <button 
             name="imperial" 
             className='text-xl text-white cursor-pointer transition ease-out hover:scale-125' 
             onClick={handleUnitsChange}> °F</button>
            
        </div>
    </div>
  )
} 

export default Inputs