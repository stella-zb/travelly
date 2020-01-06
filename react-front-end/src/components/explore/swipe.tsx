import React, { useState, FC, Fragment, useEffect } from 'react'

import { useSprings, useSpring, animated, interpolate } from 'react-spring'
import { useGesture, useScroll } from 'react-use-gesture'
import styled from 'styled-components';
import Axios from 'axios';
// import './styles.css'


interface SwipeProps {
  // i?:number
  // useGesture: (e: React.SyntheticEvent) => void,
  // useSprings: (e: React.SyntheticEvent<EventTarget>) => void
}

const Swiping = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  padding: 20px 0;
`;
const Card =styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  margin-left: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
export const Swipe: FC<SwipeProps> = () => {

  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));
  
  const cards = [
    'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
  ]
  

  useEffect(() => {
  
    // Axios.get()
  },[]);
  

  const bind = useScroll(event => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? event.delta[0] : 0
      }deg)`
    });
  });
  
  return (
    <Fragment>
      <h2>check</h2>
      <Swiping>

        <div className="container" {...bind()}>
          {cards.map(card => (
            <Card>
              <animated.div
                key={card}
                className="card"
                style={{
                  ...style,
                  backgroundImage: `url(${card})`
                }}
              />
            </Card>
          ))}
        </div>
      </Swiping>
    </Fragment>
  );
};
