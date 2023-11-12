import React, { useState, useEffect } from "react";
import TableCelula from "./TableCelula";

const TableRow = ({index, season, raceName, total, results }) => {

  const [state, setState] = useState({ });

  const renderResuls1 = (resuls) => {
    return resuls.map((resul, index) => (
      <TableCelula
        resul={resul}
        index={index}
        total={state.total}
      />
    ));
  };



  return (
    <tr>
      <td>{season}</td>
      <td>{raceName}</td>
      <tbody>{renderResuls1(results)}</tbody>
      <td>{total}</td>
    </tr>
  );
};

export default TableRow;
