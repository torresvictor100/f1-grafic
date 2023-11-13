import React, { useState, useEffect } from "react";
import TableCelula from "./TableCelula";

const TableRow = ({index, season, raceName, results, pilotRacesSprint }) => {

  const [state, setState] = useState({total : 0});

  const renderTableCelula = (results ) => {
    return results.map((result, index) => (
      <TableCelula
      result={result}
      index={index}
      />
    ));
  };
  
  const getSprintRacesScore = (pilotRacesSprint) => {

    let corridaSprint: Record<string, string> = {}

    pilotRacesSprint.forEach((races) => {
      corridaSprint[races.raceName] = races.SprintResults[0].points;
      });
      
    return corridaSprint
  }

  let pilotSprintResults = getSprintRacesScore(pilotRacesSprint)

  return (
    <tr>
      <td>{season}</td>
      <td>{raceName}</td>
      <td>{pilotSprintResults[raceName] || "No have"}</td>
      <tbody>{renderTableCelula(results)}</tbody>
      
    </tr>
  );
};

export default TableRow;
