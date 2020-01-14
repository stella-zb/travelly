import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 40px;
`;

const Button = styled.button`
  background: #76bed0;
  color: #fcfcfc;
  font-size: 20px;
  border-radius: 6px;
  border: none;
  height: 35px;
`;

const Input = styled.input`
  font-size: 17px;
  border: 1px solid #b6b6b6;
  border-radius: 6px;
  padding: 3px;
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
`;

const Content = styled.div`
  text-align: left;
`;

const Ul = styled.ul`
  padding-left: 20px;
`;

const Back = styled.button`
  color: #f55d3e;
  font-size: 15px;
  float: left;
  position: relative;
  top: 30px;
  left: 20px;
  border: 1px solid #f55d3e;
  border-radius: 6px;
  background: #fcfcfc;
`;

type InviteTypes = { trip: string; goBack: any };
export const Invite = ({ trip, goBack }: InviteTypes) => {
  const [email, getEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(null);
  const [users, setUsers] = useState<Array<any>>([]);

  const inviteFriend = (e: any) => {
    e.preventDefault();
    axios
      .post(`/api/trips/${trip}/invite`, {
        user: email
      })
      .then(() => setSuccess(true))
      .then(() => loadUsers())
      .catch(() => setSuccess(false));
  };

  const loadUsers = () => {
    axios.get(`/api/trips/${trip}/users`).then(res => setUsers(res.data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const inviteMessage = (state: boolean) => {
    if (state === true) {
      return "User added!";
    } else if (state === false) {
      return "User is already on this itinerary";
    }
  };

  return (
    <>
      <Back onClick={goBack}>Back</Back>

      <Container>
        <h1>Invite</h1>
        {inviteMessage(success)}
        <Form onSubmit={inviteFriend}>
          <Input
            type="text"
            value={email}
            onChange={e => getEmail(e.target.value)}
            placeholder="Email"
          />
          <Button type="submit">Submit</Button>
        </Form>

        <Content>
          <p>On this trip:</p>
          <Ul>
            {users.map(user => (
              <li key={user.user_id}>
                {user.first_name} {user.last_name}
              </li>
            ))}
          </Ul>
        </Content>
      </Container>
    </>
  );
};
