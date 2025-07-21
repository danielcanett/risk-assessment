import React from "react";

export default function WarehouseList({ warehouses, onSelectWarehouse, selectedWarehouseId }) {
  return (
    <div className="warehouse-list">
      <h3>Almacenes Mercado Libre</h3>
      <ul>
        {warehouses.map(wh => (
          <li
            key={wh.id}
            className={selectedWarehouseId === wh.id ? "selected" : ""}
            onClick={() => onSelectWarehouse(wh.id)}
          >
            <strong>{wh.name}</strong>
            <br />
            <span>{wh.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}