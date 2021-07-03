import React from "react";
import slugify from "slugify";

import "./styles/table.css";

const Table: React.FC = () => {
  const headers = [
    "ID",
    "Comercio",
    "CUIT",
    "Concepto 1",
    "Concepto 2",
    "Concepto 3",
    "Concepto 4",
    "Concepto 5",
    "Concepto 6",
    "Balance Actual",
    "Activo",
    "Ultima Venta",
  ];
  return (
    <div id="results">
      <table className="results-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={slugify(header)}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
