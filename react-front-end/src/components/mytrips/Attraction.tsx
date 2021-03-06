import React, {useState, useEffect} from "react";
import styled from "styled-components";

type AttractionTypes = {
  id: number;
  name: string;
  img: string;
  editable: boolean;
  deleteAttraction: any;
  firstName: string | null;
  lastName: string | null;
  duration: number;
  updateDuration: any;
};

const Name = styled.div`
  text-align: center;
  color: #fff;
  height: 100px;
  display: flex
  justify-content: center;
  align-items: center;
  position: relative;
  left: 15px;
  padding-right: 13px;
  padding-left: 13px;
`;

const DeleteButton = styled.button`
  background: #f55d3e;
  border: solid 1px #f55d3e;
  color: #fcfcfc;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const Submitter = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: solid 1px #fff;
  border-radius: 50%
  height: 22px;
  width: 22px;
  line-height: 22px;
  margin-top: 4px;
  float: right;
  position: relative;
  left: 5px;
  font-size: 11px;
`;

const Actions = styled.div`
  text-align: right;
  position: relative;
  bottom: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Btn = styled.button`
  background: #FFF;
  border-radius: 4px;
`;

const Duration = styled.input`
  width: 45px;
  margin: 0 7px;
  border-radius: 4px;
`;

export const Attraction = ({id, name, img, editable, deleteAttraction, firstName, lastName, duration, updateDuration}: AttractionTypes) => {
  
  const [time, setTime] = useState<number>(duration);

  const Container = styled.div`
    padding: 10px 20px 15px 20px;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.65)
      ),
      url(${img});
    background-size: 100%;
    background-position: center;
    border-radius: 10px;
    height: 100px;
  `;

  useEffect(() => {
    updateDuration(id, time);
  }, [time])

  return (
    <Container>
      {firstName && (
        <Submitter>
          {firstName[0]}
          {lastName[0]}
        </Submitter>
      )}
      <Name>
        <h2>{name}</h2>
      </Name>

      <Actions>
        {editable && (
          <div>
            <Btn onClick={() => setTime(time - 3600)}>-</Btn>
              <Duration defaultValue={time / 3600} onChange={(e) => setTime(Number(e.target.value) * 3600)} />
            <Btn onClick={() => setTime(time + 3600)}>+</Btn>
          </div>
        )}
        {editable && (
          <DeleteButton onClick={() => deleteAttraction(id)}>
            DELETE
          </DeleteButton>
        )}
      </Actions>
    </Container>
  );
};
