import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../main';
const Profile = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <div>
      <h1 className='text-black'>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age} </p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
