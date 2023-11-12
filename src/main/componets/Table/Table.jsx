import React from "react";
import TableRow from "./TableRow";

const Table = ({ races }) => {

    const renderRows = (races) => {
        return races.map((races, index) => (
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
        {renderRows(races)}
        <h1>---------------------------</h1>
      </tbody>
    </table>
  );
};

export default Table;
