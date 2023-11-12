import React, { useState, useEffect } from "react";



const TableCelula = ({ resul, index, total }) => {

  const [state, setState] = useState({ pontuacao1: [], dataPiloto: [] });

  state.piloto = resul.Driver.familyName;
  state.total += parseInt(resul.points, 10);
  state.pontuacao1.push(state.total);

  return (
    <tr key={index}>
      <td>{resul.Driver.familyName}</td>
      <td>{resul.Constructor.name}</td>
      <td>{resul.points}</td>
    </tr>
  );
};

export default TableCelula;
