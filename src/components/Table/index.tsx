import React from "react";
import { Spinner } from "@chakra-ui/react";

import "../../styles/table.css";
import Navigation from "./Navigation";
import TBody from "./TBody";
import THeaders from "./THeaders";

interface TableProps extends TableData {
  loading: boolean;
  handleSort: (
    event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    last_input: [string, string[]]
  ) => void;
}

const Table: React.FC<TableProps> = (props) => {
  return (
    <div className="table-container">
      <div id="results">
        <table className="results-table">
          <THeaders {...props} />

          {props.loading || <TBody data={props.data} />}
        </table>
      </div>

      {props.loading ? (
        <Spinner
          alignSelf="center"
          thickness="4px"
          speed="0.65s"
          emptyColor="blackAlpha.200"
          color="orange.500"
          size="xl"
        />
      ) : (
        <Navigation {...props} />
      )}
    </div>
  );
};

export default Table;
