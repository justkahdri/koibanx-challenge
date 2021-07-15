import React, { MouseEventHandler } from "react";
import slugify from "slugify";

type THeadersProps = {
  order: TOrder;
  sortTable: MouseEventHandler<HTMLTableCellElement>;
};

type SortableHeaderProps = {
  name: string;
  id: string;
  order: TOrder;
  handleClick: MouseEventHandler<HTMLTableHeaderCellElement>;
};

const THeaders = ({ order, sortTable }: THeadersProps) => {
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
    <thead>
      <tr>
        {headers.map((header) =>
          ["Comercio", "CUIT"].includes(header) ? (
            <SortableHeader
              key={slugify(header)}
              name={header}
              id={header == "Comercio" ? "commerce" : "cuit"}
              order={order}
              handleClick={sortTable}
            />
          ) : (
            <th key={slugify(header)}>{header}</th>
          )
        )}
      </tr>
    </thead>
  );
};

const SortableHeader = (props: SortableHeaderProps) => {
  const { name, id, order, handleClick } = props;
  let match, value;
  if (order) {
    match = order.param;
    value = order.value == 1;
  }

  return (
    <th
      id={id}
      className={value && match == id ? "sortable active" : "sortable"}
      onClick={handleClick}
    >
      {name}
    </th>
  );
};

export default THeaders;
