const Notification = ({ message }) => {
  // if message is null, the component isn't rendered
  if (message !== null) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
};

export default Notification;
