import { Spinner } from "@chakra-ui/react";
import React from "react";
import slugify from "slugify";
import { Response } from "../Types";

import "./styles/table.css";

interface TableProps extends Partial<Response> {
  loading: boolean;
}

const Table: React.FC<TableProps> = (props) => {
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

  if (props.loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="blackAlpha.200"
        color="orange.500"
        size="xl"
      />
    );
  } else if (!props.data) {
    return <h2>🔎 Los resultados aparecer&aacute;n aqu&iacute;.</h2>;
  }

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
          {props.data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id.slice(0, 10)}</td>
              <td>{entry.commerce}</td>
              <td>{entry.cuit}</td>
              {entry.concepts.map((concept, idx) => (
                <td key={idx}>{concept}</td>
              ))}
              <td>{entry.current_balance.toLocaleString()}</td>
              <td>{entry.active ? "Activo" : "No activo"}</td>
              <td>{entry.last_sale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TODO Display pages and navigation

export default Table;
