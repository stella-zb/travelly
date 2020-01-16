import React from 'react';
import styled from 'styled-components';
import list from '../../images/list.svg';
import map from '../../images/map.svg';

type PropTypes = { text: string, click:any }

const Btn = styled.div`
  background: #F7CB15;
  border: 1px solid #B29210;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  z-index: 998;
  position: fixed;
  bottom: 70px;
  right: 20px;
  display: flex;
  align-items: center;
  align-content: center;
`;

const Icon = styled.img`
  width: 60%;
  height: 60%;
  margin: auto;
`
const Generate = styled.p`
  display: block;
  margin: 0 auto;
`

export const Button = ({text, click}: PropTypes) => {

  const renderButtonType = (type:string) => {
    if (type === 'list') {
      return <Icon src={list} />
    } else if (type === 'map') {
      return <Icon src={map} />
    } else {
      return <Generate>{text}</Generate>
    }
  }

  return (
    <Btn onClick={click}>
      {renderButtonType(text)}
    </Btn>
  )
}

