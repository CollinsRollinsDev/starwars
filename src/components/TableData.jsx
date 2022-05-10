import React from "react";

const TableData = ({ name, gender, height }) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{height}cm</td>
      </tr>
    </>
  );
};

export default TableData;
