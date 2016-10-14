import React, {PropTypes} from 'react';

const ProfilePage = (props) => {
  return (
    <div>
      <h1>Profile for {props.username}</h1>

      <ul>
        <li>Email address: {props.emailAddress}</li>
      </ul>
    </div>
  );
};

ProfilePage.propTypes = {
  emailAddress: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default ProfilePage;
