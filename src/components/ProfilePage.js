import React from 'react';

const ProfilePage = (props) => {
  // console.log('profile page props',props );
  return (
    <div>
      <h1>Profile for {props.username}</h1>

      <ul>
        <li>Email address: {props.emailAddress}</li>
      </ul>
    </div>
  );
};

export default ProfilePage;
