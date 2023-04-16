import React from 'react';

// if message is null, the component isn't rendered
const Notification = ({ message }) =>
  message !== null ? (
    <div className="error">{message}</div>
  ) : (
    <div className="error" style={{ display: 'none' }} />
  );
export default Notification;
