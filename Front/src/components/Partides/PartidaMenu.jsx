import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { useSelector, useDispatch } from 'react-redux';

import { HiLocationMarker } from 'react-icons/hi'
import { BsPerson, BsFillDice5Fill, BsDeviceSsd } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { setFilter } from '../../Slices/Partides/partidaSlice';
import {useForm} from '../../hooks/useForm';

import '../components.css'

export const PartidaMenu = () => {

  
    let { authToken, setAuthToken } = useContext(UserContext);
    const dispatch = useDispatch()

    const { filter } = useSelector((state)=> state.partida)
    const { formState, onInputChange } = useForm({
      search: "",
    });
    const {search} = formState

    const sendLogout = async (e) => {
        e.preventDefault();
        try{
            const data = await fetch("http://equip06.insjoaquimmir.cat/api/logout", {
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '  + authToken,
                },
                method: "POST",
            });
            const resposta = await data.json();
            if (resposta.success === true) setAuthToken("")
            else console.log("Error logout")
        }catch{
            console.log(data);        
        }        
    };

  return (
    <>
      <div className="menuheader2">          
        <div className='search'>
          <input className='form-control'        
            type="text" placeholder="Busca" name="search" value={ search } onChange={ onInputChange} />
            <button className="btn searchbtn" type="submit" onClick={(e) => {e.preventDefault;dispatch(setFilter({...filter,poblacio:formState.search}))}}>&#128270;</button>
        </div>
          <button className="logout" onClick={(e) => {
          sendLogout(e);
            }}> <RiLogoutBoxLine /> Logout
        </button>    
      </div>         
    </>
  );  
}