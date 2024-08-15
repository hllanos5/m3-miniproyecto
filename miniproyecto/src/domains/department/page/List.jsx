import React from 'react'
import { Titulo } from '../components/Titulo'
import { Card } from '../components/Card'

export function List({data}) {
  return (
    <>
        <Titulo/>        
        <div className='contenido'>
            <ul className="card">
            {
                data.map((obj,index) =>
                    <Card key={index} obj={obj}/>
                )
            }            
            </ul>
        </div>
      </>
  )
}
