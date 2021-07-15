import React, { MouseEventHandler } from "react";
import { Spinner } from "@chakra-ui/react";

import Navigation from "./Navigation";
import TBody from "./TBody";
import THeaders from "./THeaders";

import "../../styles/table.css";

interface TableProps extends TableData {
  loading: boolean;
  handleSort: (
    event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    last_input: [string, TFilters]
  ) => void;
}

const Table: React.FC<TableProps> = (props) => {
  const sortTable: MouseEventHandler<HTMLTableHeaderCellElement> = (e) => {
    props.handleSort(e, props.last_input);
  };

  return (
    <div className="table-container">
      <div id="results">
        <table className="results-table">
          <THeaders order={props.order} sortTable={sortTable} />

          {props.loading || <TBody data={props.data} />}
        </table>
      </div>

      {props.loading ? (
        // This is the only external component in the Table:
        // A spinner that shows the user the table is loading
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
