import React, { FC, Fragment } from 'react';
import styled from "styled-components";

interface FilterProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
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
const FilterTab = styled.div`
  display: flex;
  height: 200px;
`;
const Input = styled.input`
  // display: flex;
  font-size: 10px;
`;
export const FilterButton: FC<FilterProps> = ({ handleToggle }) => {
  
  handleToggle = () => {

  };

  return (
    <Fragment>
      <Button onClick={handleToggle}>Filter</Button>
    </Fragment>
  );
};