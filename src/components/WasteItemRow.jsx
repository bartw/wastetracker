import React from "react";

export default function WasteItemRow({ wasteItem, onDelete }) {
  return (
    <tr>
      <td>{wasteItem.userName}</td>
      <td>{wasteItem.type}</td>
      <td>{wasteItem.description}</td>
      <td style={{textAlign: 'right'}}>{wasteItem.duration.toFixed(1)}</td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
