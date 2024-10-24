import React from 'react'
import { useLocation } from 'react-router-dom';

export default function NewsDetails() {
    const location = useLocation();
    const { title, images,body } = location.state || { title: '',body:'', images: [] };
  return (
    <div  >
 <div style={{ padding: '20px' }} >
    <h1 className='text-center'>{title}</h1>
    
    <div className='m-auto' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent:'center'}}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`news-image-${index}`}
          style={{
            width: '18%',
            marginBottom: '10px',
            borderRadius: '50px',
          }}
        />
      ))}
    </div>
    <p  className='text-center'>{body}</p>
  </div>
    </div>
   
  )
}
