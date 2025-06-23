import React from 'react'
import CardItem from './CardItem'
import Card1 from '../../assets/cardI1.jpg'
import CardRE from '../../assets/cardResurseE.jpg'
import CardMembrii from '../../assets/cardMembrii.jpg'
import CardAutori from '../../assets/cardAutori.jpg'
import { useSpring, animated } from '@react-spring/web';
function Number({n}){
    const {number}=useSpring({
        from:{number:0},
        number:n,
        delay:200,
        config:{mass:1, tension:20, friction:10},
    });
    return (
        <animated.div>
            {number.to((n) => `${n.toFixed(0)}+`)}
        </animated.div>
    );
    }

const Cards = () => {
  return (
    <div>
        <div className='cards'>
      
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={Card1}
              text='Carti tiparite'
              number={<Number n={1234}/>}
            />
            <CardItem
              src={CardRE}
              text='Resurse electronice'
              number={<Number n={756}/>}
            />
          
            <CardItem
              src={CardMembrii}
              text='Membrii'
              number={<Number n={10345}/>}
            />
            <CardItem
              src={CardAutori}
              text='Autori'
              number={<Number n={1678}/>}
            />
            
          </ul>
        </div>
      </div>
      
    </div>
      
    </div>
  )
}

export default Cards
