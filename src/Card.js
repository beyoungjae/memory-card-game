import React from 'react'
import './Card.css'

const Card = ({ card, onClick, isFlipped }) => {
   return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
         <div className="card-inner">
            <div className="card-front">?</div>
            <div className="card-back">
               <img src={card.image} alt={card.id} />
            </div>
         </div>
      </div>
   )
}

export default Card
