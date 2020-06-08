import React from "react";

export default function ListGroup({
  items,
  textProperty = "name",
  valueProperty = "_id",
  selectedItem,
  onItemSelect,
}) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}
