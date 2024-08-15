import React, { useState, useEffect } from 'react'
import { List } from './domains/department/page/List';
import { Nav } from './domains/shared/components/Nav';
import { Modal } from './domains/shared/components/Modal';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [location, setLocation] = useState(["Helsinki, Finland","Turku, Finland","Vaasa, Finland","Oulu, Finland"]); 
  const [locationGeneralFilter, setLocationGeneralFilter] = useState();
  const [guestsGeneralFilter, setGuestsGeneralFilter] = useState(0);
  const [adultGuestsGeneralFilter, setAdultGuestsGeneralFilter] = useState(0);
  const [childrenGuestsGeneralFilter, setChildrenGuestsGeneralFilter] = useState(0);

  async function getData() {

    const data = await fetch('stays.json');
    const jsonData = await data.json();
    setData(jsonData);
    setDataFilter(jsonData);
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  useEffect(()=>{
   getData();

  },[]);

  return (
    <>
      <div className={'contenedor-principal '+ (isOpen ? 'bloqueo' : '')}>
        <Nav 
        toggleModal={toggleModal} 
        locationGeneralFilter={locationGeneralFilter}
        guestsGeneralFilter = {guestsGeneralFilter}/>
        <List data={dataFilter} />
      </div>
      { isOpen &&
        <Modal 
          toggleModal={toggleModal} 
          location={location} 
          data={data} 
          setDataFilter={setDataFilter} 
          setLocationGeneralFilter= {setLocationGeneralFilter}
          locationGeneralFilter={locationGeneralFilter}
          setGuestsGeneralFilter = {setGuestsGeneralFilter}
          setAdultGuestsGeneralFilter= {setAdultGuestsGeneralFilter}
          setChildrenGuestsGeneralFilter={setChildrenGuestsGeneralFilter}
          adultGuestsGeneralFilter = {adultGuestsGeneralFilter}
          childrenGuestsGeneralFilter = {childrenGuestsGeneralFilter}
          />
      }
    </>
  )
}

export default App
