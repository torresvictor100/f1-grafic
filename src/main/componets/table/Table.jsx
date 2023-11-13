import React from "react";
import TableRow from "./TableRow";

const Table = ({ pilotRaces1, pilotRaces2, pilotSprintRaces1 , pilotSprintRaces2  }) => {

    const renderRows = (pilotRaces, pilotRacesSprint) => {

        return pilotRaces.map((races, index) => (
          <TableRow
            key={index}
            season={races.season}
            raceName={races.raceName}
            results={races.Results}
            pilotRacesSprint= {pilotRacesSprint}
          />
        ));
      };

  

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Season</th>
          <th>GP</th>
          <th>Pilot | Team | Score</th>
        </tr>
      </thead>
      <tbody>
        <h1>Pilot</h1>
        {renderRows(pilotRaces1, pilotSprintRaces1)}
        <h1>Pilot</h1>
        {renderRows(pilotRaces2, pilotSprintRaces2)}
      </tbody>
    </table>
  );
};

export default Table;
