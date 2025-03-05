import React from 'react'

const LocationSearchPanel = (props) => {
  
  const locations=[
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "22C, Near Malhotra's cafe, Sheryians Coding School, Bhopal",
    "20B, Near Singhania's cafe, Sheryians Coding School, Bhopal",
    "18A, Near Sharma's cafe, Sheryians Coding School, Bhopal"
  ]
  return (
    <div>
    {locations.map((location,idx)=>{
      return(
        <div key={idx} onClick={()=>{
          props.setVehiclePanel(true)
          props.setPanelOpen(false)
        }} className='flex items-center rounded-xl p-3 border-2 border-white active:border-black gap-4 my-2 justify-start'>
          <h2 className='bg-[#eee] h-10 w-16 flex items-center justify-center rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
          <h4 className='text-base font-medium'>{location}</h4>
        </div>
      )
    })}

    </div>
  )
}

export default LocationSearchPanel