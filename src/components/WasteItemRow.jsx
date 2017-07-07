import React from "react";
import { render } from "react-dom";

export default function WasteItemRow({ name, onDelete }) {
  return (
    <tr>
      <td>
        <a>
          {name}
        </a>
      </td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
