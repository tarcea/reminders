import React, { useEffect, FC } from 'react';
import './styles/message.css';

const Message: FC<{ message: String, setMessage: Function }> = ({ message, setMessage }) => {

  useEffect(() => {
    const delay = setTimeout(() => {
      setMessage('')
    }, 1500);
    console.log('message martor')
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