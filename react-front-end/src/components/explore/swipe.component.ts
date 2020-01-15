import styled, { keyframes } from "styled-components";

export const animation = keyframes`
  from: {
    opacity: 0
  },
  to: {
    transition: all 0.3s ease;
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
    opacity: 1;
  }
`;

export const animation1 = keyframes`
  from: {
    opacity: 0
  },
  to: {
    transition: all 0.3s ease;
    -webkit-transform: translateY(-20px);
            transform: translateY(-20px);
    opacity: 1;
  }
`;

export const Container = styled.div`
  grid-template-rows: 10% 80% 10%;
  background: #E5F9FF;
  height: calc(100vh + 10px);

`;

export const TopBar = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

export const Attractions = styled.div`
  // position: relative;
  // height: 70vh;
  // weight: 80vw;
  // // border: solid;
  // margin: 10px 10px;
  // overflow: hidden;
`;
export const SliderContent = styled.div`
  text-align: center;
  opacity: 1;
  height: 65vh;
  background-size: 100%;
`;

export const Inner = styled.div`
  padding: 0 70px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: grid;
`;
export const Name = styled.h4`
  font-weight: 600;
  margin: 0 auto;
  max-width: 640px;
  color: #fcfcfc;
  font-size: 20px;
  line-height: 1;
  animation: ${animation1};
`;

export const Button = styled.button`
  -webkit-appearance: none;
  appearance: none;
  -webkit-filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
  -webkit-transition: all 0.5s ease;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  border: none;
  background: #f55d3e;
  border-radius: 30px;
  text-transform: uppercase;
  box-sizing: border-box;
  padding: 15px 30px;
  font-weight: 400;
  font-size: 10px;
  cursor: cursor;
  &:hover {
    color: #ffffff;
    background: #222222;
    -webkit-filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
  }
  animation: ${animation};
`;

export const Description = styled.p`
  color: #fcfcfc;
  font-size: 14px;
  line-height: 1.5;
  margin: 20px auto 30px;
  max-width: 640px;
  animation: ${animation};
`;

export const City = styled.h2`
  margin-left: 5vw;
  text-transform: uppercase;
  font-size: 30px;
  text-align: left;
  display: center;
`;

export const NavButton = styled.button`
  text-align: center;
  margin-bottom: 40px;
  border: 0;
  width: 60px;
  background: #F55D3E;
  height: 30px;
  border-radius: 15px;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 10px;
  cursor: cursor;
  position: relative;
  bottom: 240px;                     
`;
