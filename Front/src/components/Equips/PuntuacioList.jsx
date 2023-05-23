import React from 'react';

export const PuntuacioList = ({ equip, equips }) => {

  const getColorClass = () => {
    let maxPunts = 0;
    equips.forEach((e) => {
      if (e.punts > maxPunts) {
        maxPunts = e.punts;
      }
    });
    return equip.punts === maxPunts ? 'equipo-max-puntuacion' : 'equipo-otra-puntuacion';
  };


  return (
    <>
        <td className={getColorClass()}>{equip.nom}</td>
        <td>{equip.punts}</td>
    </>
  );
};
