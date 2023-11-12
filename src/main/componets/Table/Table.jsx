import React from "react";
import TableRow from "./TableRow";

const Table = ({ pilotoRaces1, pilotoRaces2 }) => {

    const renderRows = (pilotoRaces) => {
        return pilotoRaces.map((races, index) => (
          <TableRow
            key={index}
            season={races.season}
            raceName={races.raceName}
            total={races.total}
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
          <th>pontuação</th>
        </tr>
      </thead>
      <tbody>
        {renderRows(pilotoRaces1)}
        <h1>---------------------------</h1>
        {renderRows(pilotoRaces2)}
      </tbody>
    </table>
  );
};

export default Table;
