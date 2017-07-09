import React from "react";

export default function ProjectRow({ name, setSelected, onDelete }) {
  return (
    <tr>
      <td>
        <a onClick={setSelected}>
          {name}
        </a>
      </td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
