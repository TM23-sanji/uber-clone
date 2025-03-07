import React from 'react' ;
import axios from 'axios'; 
const LocationSearchPanel = (props) => {

  const fetchFare = async () =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup: props.pickup, destination: props.destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      props.setFare(response.data || {})
    }
    catch (err){
      console.error('Error fetching fare:', err);
    }
  }
  
  return (
    <>
    <div>
      {props.suggestions.length > 0 ?(
        props.suggestions.map((suggestion,idx)=>(
            <div key={idx} onClick={()=>{
              if(props.pickupOn){
                props.setPickup(suggestion.label)
                props.setPickupOn(false)
              }
              if (props.destinationOn){
                props.setDestination(suggestion.label)
                props.setDestinationOn(false)
            }
            }} className='flex items-center rounded-xl p-3 border-2 border-white active:border-black gap-4 my-2 justify-start'>
              <h2 className='bg-[#eee] h-10 w-16 flex items-center justify-center rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
              <h4 className='text-base font-medium'>{suggestion.label}</h4>
            </div>
      ))
      ) :(
        <p className="text-gray-500 p-3">No suggestions found</p>
    )}
    </div>

    <div className="flex justify-between mt-16">
      <button onClick={()=>{props.setPickup('');props.setDestination('');props.setPanelOpen(false)}} className="bg-red-200 px-4 py-2 rounded hover:bg-red-600"><i className="text-xl ri-pause-circle-fill"></i></button>
      <button onClick={()=>{
      if (props.pickup && props.destination){
        props.setVehiclePanel(true);props.setPanelOpen(false);fetchFare()
        }}} className="bg-green-200 px-4 py-2 rounded hover:bg-green-600"><i className="text-xl ri-speed-fill"></i></button>
    </div>
    </>
  )
}

export default LocationSearchPanel

