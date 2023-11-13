import React from "react";
import TableRow from "./TableRow";

const Table = ({ pilotRaces1, pilotRaces2 }) => {

    const renderRows = (pilotRaces) => {
        return pilotRaces.map((races, index) => (
          <TableRow
            key={index}
            season={races.season}
            raceName={races.raceName}
            results={races.Results}
          />
        ));
      };

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>ano</th>
          <th>gp</th>
          <th>piloto construtor pontos</th>
        </tr>
      </thead>
      <tbody>
        {renderRows(pilotRaces1)}
        <h1>---------------------------</h1>
        {renderRows(pilotRaces2)}
      </tbody>
    </table>
  );
};

export default Table;
