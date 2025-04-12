import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser,clearUser } from '../features/user';

const Login = () => {
  const dispatch = useDispatch();
  const data = {
    name: 'John Rey Decosta',
    age: 20,
    email: 'pedro@gmial.com',
  };
  return (
    <div>
      <button
        onClick={() => {
          dispatch(setUser(data));
        }}
      >Login</button>
     <button
        onClick={() => {
          dispatch(clearUser());
        }}
      >Logout</button>
    </div>
  );
};

export default Login;
