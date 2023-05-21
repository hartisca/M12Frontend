import React from 'react'

export const PuntuacioList = ({equip}) => {
  return (
    <>
        <td>{equip.nom}</td>
        <td>{equip.punts}</td>
    </>
  )
}
