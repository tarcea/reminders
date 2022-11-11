import React, { useEffect, FC } from 'react';
import './styles/Message.css';

const Message: FC<{ message: String, setMessage: Function }> = ({ message, setMessage }) => {

  useEffect(() => {
    const delay = setTimeout(() => {
      setMessage('')
    }, 1600);
    return () => {
      clearTimeout(delay)
    }
  }, [message, setMessage]);

  return (
    <div className="message__container">
      {<p>{message}</p>}
    </div>
  )
}

export default Message