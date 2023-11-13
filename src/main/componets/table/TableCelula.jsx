import React, { useState, useEffect } from "react";



const TableCelula = ({ result, index }) => {

  const [state, setState] = useState({ score: [], dataPiloto: [] });

  state.pilotName = result.Driver.familyName;
  state.totalScore += parseInt(result.points, 10);
  state.score.push(state.total);

  return (
    <tr key={index}>
      <td>{result.Driver.familyName}</td>
      <td>{result.Constructor.name}</td>
      <td>{result.points}</td>
    </tr>
  );
};

export default TableCelula;
