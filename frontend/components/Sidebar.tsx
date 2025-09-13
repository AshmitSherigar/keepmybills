import React from 'react';

const Sidebar = ({ user }: any) => { 
  if (!user)
    return (
      <div className="sidebar">
        <p>None</p>
        <p>None</p>
      </div>
    );

  return (
    <div className="sidebar">
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Sidebar;
