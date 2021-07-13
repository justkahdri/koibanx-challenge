import React from "react";

type TBodyProps = {
  data: DataRow[];
};

const TBody = ({ data }: TBodyProps) => (
  <tbody>
    {data.map((entry) => (
      <tr key={entry.id}>
        <td>{entry.id.slice(15)}</td>
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
);

export default TBody;
