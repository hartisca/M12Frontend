import React, { useState } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BsMailbox } from 'react-icons/bs'

export const Login = ({setRegister}) => {

 

  return (
    <>
        <div className='Login'>
            <div className="login-field input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping"><BsMailbox/></span>
                <input type="email" className="form-control" placeholder="Email" aria-label="email" aria-describedby="addon-wrapping" />
            </div>
            <div className="login-field input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping"><RiLockPasswordLine/></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="password" aria-describedby="addon-wrapping" />
            </div>
        </div>
        <a className ="login1"
        onClick={() => {
          setRegister(false);
        }}
      > Registra't</a>
    </>
  )
}
