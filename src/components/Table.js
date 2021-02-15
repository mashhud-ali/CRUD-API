import React from 'react';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

function Table({ onSort, columns, sortColumn }) {
  const renderIcon = column => {
    if (!sortColumn.name) return null;
    if (column.name === sortColumn.name) {
      return sortColumn.order === 'asc' ? <ArrowUp /> : <ArrowDown />;
    }
  };

  const handleSort = column => {
    const newSortColumn = {
      name: column.name,
      order: column.name === sortColumn.name
        ? sortColumn.order === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc'
    }
    onSort(newSortColumn);
  };

  return (
    <thead>
      <tr className="text-center">
        {columns.map(column => (
          <th scope="col" className="clickable" onClick={() => handleSort(column)} >
            {column.label} {renderIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Table;
