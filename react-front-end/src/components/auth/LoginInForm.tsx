import React, { useState } from "react";
import { AuthForm, Input, Button } from "./Auth.components";
import Axios from "axios";
import { Redirect } from "react-router-dom";

interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  facebook?: string;
}

type LogInTypes = { setLogin: any };

export const LoginInForm = ({ setLogin }: LogInTypes) => {
  // user input state
  const [{ email, password }, setCredentials] = useState({
    email: '',
    password: ''
  });

  // error state
  const [error, setError] = useState('');

  const [user, setUser] = useState({} as User);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Axios.post(`/login/${email},${password}`)
      .then(res => {
        if (res.data.error) {
          return setError(res.data.error);
        } else {
          localStorage.setItem('userID', res.data.user.id);
          setUser(res.data.user);
          setLogin();
        }
      })
      .catch(err => console.log(err))
  };

  return (
    !!user.id ? <Redirect to='/explore' /> : <AuthForm onSubmit={login}>
      <h1>Log In</h1>
      <Input
        placeholder="Enter Email"
        value={email}
        onChange={e => setCredentials({
          email: e.target.value,
          password
        })}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setCredentials({
          email,
          password: e.target.value
        })}
        required
      />
      <Button type="submit">Log In</Button>
      {error.length > 0 && <p>{error}</p>}
    </AuthForm>
  );
};