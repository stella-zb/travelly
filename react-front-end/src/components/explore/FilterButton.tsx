import React, { FC, Fragment } from 'react';
import styled from "styled-components";

interface FilterProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.5);
`;

const Button = styled.button`
  text-align: right;
  margin: 20px 10px;
  background-color: 
  border: solid;
  background: #FFD800;
  height: 30px;
  border-radius: 15px;
  text-transform: uppercase;
  padding: 15px 10px;
  font-weight: 400;
  font-size: 10px;
  cursor: cursor;
`;
export const FilterButton: FC<FilterProps> = ({ handleToggle }) => {
  
  handleToggle = () => {

  };

  return (
    <Container>
      <Button onClick={handleToggle}>Filter</Button>
    </Container>
  );
};