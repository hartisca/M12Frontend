import React from 'react';
import { useNavigate } from 'react-router-dom';
import {IoChevronBackOutline} from 'react-icons/io5'

const BotoBack = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  }

  return (
      <div className="backButton">
        <button className="bbuttn"onClick={handleClick} > <IoChevronBackOutline />Back</button>
      </div>
  );
}

export default BotoBack;
