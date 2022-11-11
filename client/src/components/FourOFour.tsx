import React from 'react';
import { useNavigate } from 'react-router-dom';

const FourOFour = () => {
  const navigate = useNavigate()
  return (
    <div className="App">
      <h2>This page does not exist</h2>
      <button className="fof__to-fun" onClick={() => navigate('/lists')}>back to fun...</button>
    </div>
  );
};

export default FourOFour;
