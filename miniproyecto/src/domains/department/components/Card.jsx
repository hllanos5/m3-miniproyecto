import React from 'react'

export  function Card({obj}) {
  return (
    <li>
        <figure>
        <img src={obj.photo}/>
        </figure>
        <div className='linea-1'>
        {obj.superHost === true && 
            <div className='super-host'>SUPER HOST</div>
        }
        <div className='description'>
            {obj.type} 
            {obj.beds!== null && <span>. {obj.beds} beds</span>}
        </div>
        <div className='clasificacion'>
            <span className="material-symbols-outlined">
            star
            </span>{obj.rating}
        </div>
        </div>
        <div className='linea-2'>
        <h2>
            {obj.title}
        </h2>
        </div>
    </li>
  )
}
