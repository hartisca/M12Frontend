import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';





export const LoginRegister = () => {

    let [ register, setRegister ] = useState(true);


  return (
    <>
     
      {register ? <Login setRegister={setRegister}/> : <Register setRegister={setRegister} />}
      
    </>
  )
}
