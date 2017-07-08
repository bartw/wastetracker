import React from "react";
import { render } from "react-dom";

export default function WasteItemRow({ userName, description, duration, onDelete }) {
  return (
    <tr>
      <td>{userName}</td>
      <td>{description}</td>
      <td style={{textAlign: 'right'}}>{duration.toFixed(1)}</td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
