import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'

import useLogin from '../hooks/useLogin'



import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  }
  from 'mdb-react-ui-kit';


export default function Login({setRegister}) {  

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  //react-hook-forms
  const { register, handleSubmit, formState: { errors } } = useForm();

  let {sendLogin,error} = useLogin()
  const onSubmit = data => sendLogin(data)

  return (
    <>
        <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Entra el teu email i contrasenya!</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Email' type='email' {...register("email", { required: true })} size="lg" name="email"/>              
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Contrassenya' type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} size="lg" name="password"/>
                <button type="button" onClick={handlePasswordToggle} className="btn-toggle-password">
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>

                <p></p>
                <button className='btnlogin mx-2 mb-5 px-5' onClick={handleSubmit(onSubmit)} color='white' size='lg'> Login </button>

                <div>
                  <p className="regis mb-0">No tens compte? <a onClick={()=>{setRegister(false);}} className="text-white-50 fw-bold">Registra't</a></p>
                </div> 
            </MDBCardBody>
            </MDBCard>

        </MDBCol>
        </MDBRow>

        </MDBContainer>
                
            
    </>
      
  )
}





