import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { setToken } from '../Slices/authSlice'


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


export default function Register({setRegister}){
  //Estat per modificar botó de mostrar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  }; 
  
  const dispatch = useDispatch();
  //react-hook-forms
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    const {name, email, password} = data

    try{
      const fetchResponse = await fetch ('http://127.0.0.1:8000/api/register', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({name, email, password})
      });
      const resposta = await fetchResponse.json();
      if (resposta.success === true ){
        dispatch(setToken(resposta.authToken))
        console.log(resposta)
      }
    } catch{
      console.log('Error en el registro:', errors);
    }
  } 
  
  return(
    <>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                <p className="text-white-50 mb-5">Entra les teves dades!</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Nom' type='text' {...register("name", { required: true })} size="lg" name="name" />
                {errors.name && <span>This field is required</span>}
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Email' type='email' {...register("email", { required: true })} size="lg" name="email" />
                {errors.email && <span>This field is required</span>}
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='Contrasenya' type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} size="lg" name="password" />
                {errors.email && <span>This field is required</span>}
                                
                <button type="button" onClick={handlePasswordToggle} className="btn-toggle-password">
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>

                
                <button className='btnlogin mx-2 mb-5 mt-5 px-5' onClick={handleSubmit(handleRegister)} color='white' size='lg'>
                  Registrat
                </button>

                <div>
                    <p className="regis mb-0">Ja tens compte? <a onClick={()=>{setRegister(true);}} className="text-white-50 fw-bold">Fes Log in</a></p>
                </div>
            </MDBCardBody>
            </MDBCard>

        </MDBCol>
        </MDBRow>

        </MDBContainer>
    </>
  )
}
