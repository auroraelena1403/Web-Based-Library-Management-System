import React from 'react'
import './Cards.css'

function CardItem(props) {
  return (
    <div>
      <li className='cards__item'>
        <div className='cards__item_1'> 
        <div className='cards_text'>
          <div className='cards__item__pic-wrap' >
            <img
              className='cards__item__img'
              alt='Travel'
              src={props.src}
            />
          </div>
          <div className='number'>
            <p>{props.number}</p>
          </div>
          <div className='text'>
            <p>{props.text}</p>
          </div>
        </div>
          
          
        </div>

      </li>
    </div>
  )
}

export default CardItem
