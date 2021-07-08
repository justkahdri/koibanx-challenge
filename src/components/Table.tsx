import { Spinner } from "@chakra-ui/react";
import React from "react";
import slugify from "slugify";
import { Response } from "../Types";

import "./styles/table.css";

interface TableProps extends Response {
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
  const near_pages = props.page
    ? [...Array(props.page + 3).keys()].map((indx) => indx + 1)
    : [];

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
    return (
      <h2 className="placeholder">
        🔎 Los resultados aparecer&aacute;n aqu&iacute;.
      </h2>
    );
  }

  return (
    <div className="table-container">
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
      <div className="navigation">
        <span className="navigation-info">
          Mostrando {props.rowsPerPage} de {props.total} resultados
        </span>
        <div>
          {props.page !== 1 && (
            <a className="navigation-link" href={`#${props.page - 1}`}>
              Anterior
            </a>
          )}
          {near_pages.slice(Math.max(near_pages.length - 7, 0)).map((page) =>
            page !== props.page ? (
              <a key={page} href={`#${page}`} className="navigation-link">
                {page}
              </a>
            ) : (
              <span key={page} className="navigation-text">
                {page}
              </span>
            )
          )}
          {props.page !== props.pages && (
            // Does not display if is in the last page
            <a className="navigation-link" href={`#${props.page + 1}`}>
              Siguiente
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// TODO Display pages and navigation
// TODO Manage sortable table

export default Table;
