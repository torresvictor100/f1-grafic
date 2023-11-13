import React, { useState, useEffect } from "react";
import TableCelula from "./TableCelula";

const TableRow = ({index, season, raceName, results }) => {

  const [state, setState] = useState({total : 0});

  const renderTableCelula = (resuls) => {
    return resuls.map((resul, index) => (
      <TableCelula
        resul={resul}
        index={index}
      />
    ));
  };
  
  return (
    <tr>
      <td>{season}</td>
      <td>{raceName}</td>
      <tbody>{renderTableCelula(results)}</tbody>
    </tr>
  );
};

export default TableRow;
