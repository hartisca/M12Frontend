import React from 'react'
import {BsFillPersonFill} from 'react-icons/bs'


export const Register = () => {
  return (
    <>
        <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping"><BsFillPersonFill/></span>
            <input type="text" class="form-control" placeholder="Nom" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
    </>
  )
}
