import React, { useEffect, useState } from 'react'

export function Modal({toggleModal, location, data, setDataFilter, setLocationGeneralFilter, locationGeneralFilter, setGuestsGeneralFilter, setAdultGuestsGeneralFilter, setChildrenGuestsGeneralFilter, adultGuestsGeneralFilter, childrenGuestsGeneralFilter}) {

    const [isOpenLocation, setIsOpenLocation] = useState(false);
    const [isOpenGuests, setIsOpenGuests] = useState(false);

    const [locationFilter, setLocationFilter] = useState("");
    const [guestsFilter, setGuestsFilter] = useState(0);
    const [adultFilter, setAdultFilter] = useState(0);
    const [childrenFilter, setChildrenFilter] = useState(0);

    const [filterValues, setFilterValues] = useState({
        location: ''
    })

    const handlerLocationSelected = (e) => {
        let filtroLocation = (e.target.textContent).replace("location_on","")
        setLocationFilter(filtroLocation);
        setFilterValues({ ...setFilterValues, ["location"]: filtroLocation })
        
    }
    const handlerAdultMenos= (e) => {
        if(adultFilter>0){
            let contador = adultFilter-1;
            setAdultFilter(contador);
            setGuestsFilter(contador+childrenFilter);
            setAdultGuestsGeneralFilter(contador);
        }        
    }
    const handlerAdultMas= (e) => {
        let contador = adultFilter+1;
        setAdultFilter(contador);
        setGuestsFilter(contador+childrenFilter);
        setAdultGuestsGeneralFilter(contador);
    }

    const handlerChildrenMenos= (e) => {
        if(childrenFilter>0){
            let contador = childrenFilter-1;
            setChildrenFilter(contador);
            setGuestsFilter(contador+adultFilter);
            setChildrenGuestsGeneralFilter(contador);
        }        
    }
    const handlerChildrenMas= (e) => {
        let contador = childrenFilter+1;
        setChildrenFilter(contador);
        setGuestsFilter(contador+adultFilter);
        setChildrenGuestsGeneralFilter(contador);
    }

    function filterData() {
        const { location } = filterValues;
        let ciudad = location.split(",")[0];
        
        if(ciudad !== "" && guestsFilter === 0){
            const rs = data.filter(obj => obj.city === ciudad);
            setDataFilter(rs);
            setLocationGeneralFilter(location);
            setGuestsGeneralFilter(guestsFilter);
            return;
        }
        if(guestsFilter > 0 && ciudad === ""){
            const rs = data.filter(obj => obj.maxGuests >= guestsFilter);
            setDataFilter(rs);
            setLocationGeneralFilter(location);
            setGuestsGeneralFilter(guestsFilter);
            return;
        }

        if(guestsFilter > 0 && ciudad !== ""){
            const rs = data.filter(obj => (obj.maxGuests >= guestsFilter && obj.city === ciudad));
            setDataFilter(rs);
            setLocationGeneralFilter(location);
            setGuestsGeneralFilter(guestsFilter);
            return;
        }

        return setDataFilter(data);
    }

    const togglePanelLocation = () => {        
        setIsOpenLocation(!isOpenLocation);
    }
    
    const togglePanelGuests = () => {
        setIsOpenGuests(!isOpenGuests)
    }

    return (
    <>
    <div className='panel-busqueda-modal-general'>
        <div className='panel-busqueda-modal'>
            <div className='location'>
            <div className='input-location' onClick={togglePanelLocation}>
                <span>LOCATION</span>
                <input type="text" value={locationFilter.length>0 ? locationFilter : locationGeneralFilter } readOnly />
            </div>
            {
                isOpenLocation && 
                <ul>
                {
                    location.map ((nombre, index)=>
                        <li key={index} onClick={handlerLocationSelected}>
                            <span className="material-symbols-outlined">
                            location_on
                            </span>
                            {nombre}
                        </li>
                    )
                }
            </ul>
            }
            
            </div>
            <div className='guest'>
            <div className='input-guest'onClick={togglePanelGuests}>
                <span>GUESTS</span>
                <input type="text" placeholder='Add guests' value={guestsFilter>0 ? guestsFilter : (adultGuestsGeneralFilter+childrenGuestsGeneralFilter)} readOnly/>
            </div>
            {
                isOpenGuests && 
                <div className='panel-guest-details'>
                    <div className='detail'>
                    <span>Adults</span>
                    <label>Ages 13 or Above</label>
                    <div className='panel-botones'>
                        <button className='signo' onClick={handlerAdultMenos}>-</button>
                        <div className='contador'>{adultFilter>0 ? adultFilter: adultGuestsGeneralFilter}</div>
                        <button className='signo' onClick={handlerAdultMas}>+</button>
                    </div>
                    </div>
                    <div className='detail'>
                    <span>Children</span>
                    <label>Ages 2 - 12</label>
                    <div className='panel-botones'>
                        <button className='signo' onClick={handlerChildrenMenos}>-</button>
                        <div className='contador'>{childrenFilter > 0 ? childrenFilter : childrenGuestsGeneralFilter}</div>
                        <button className='signo' onClick={handlerChildrenMas}>+</button>
                    </div>
                    </div>
                </div>
            }
            
            </div>
            <div className='panel-buscar'>
            <button onClick={()=>{filterData() ,toggleModal()}}>
                <span className="material-symbols-outlined">
                search
                </span>
                Search
            </button>
            </div>
        </div>
    </div>
    </>
    )
}
