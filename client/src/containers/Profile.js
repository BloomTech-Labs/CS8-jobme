import React from 'react';
import { EmployerProfile, SeekerProfile } from '../components';
const Profile = () => {
  return (
    <div>
      { false ? <EmployerProfile /> : <SeekerProfile /> }
    </div>
  );
};

export default Profile;
