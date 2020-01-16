import React, { FC, Fragment, useState } from "react";
import styled from "styled-components";

interface FilterProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShow: any;
}

const Container = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

const Button = styled.button`
  text-align: center;
  border: none;
  background: #F55D3E;
  height: 30px;
  border-radius: 15px;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 10px;
  &:hover {
    cursor: pointer;
  }
`;
export const FilterButton: FC<FilterProps> = ({ handleToggle, setShow }) => {
  const [active, setActive] = useState<Boolean>(false);
  handleToggle = () => {
    // e.preventDefault();
    if (!active) {
      setShow(true);
      setActive(true);
    } else {
      setShow(false);
      setActive(false);
    }
  };

  return (
    <Container>
      <Button onClick={handleToggle}>Filter</Button>
    </Container>
  );
};
