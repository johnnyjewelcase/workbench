import React from "react";

function List({ groceries }) {
  const result = groceries.filter(purchased => groceries.purchased === true);
  console.log(result);
  return (
    <ul className="list-group">
      {result.map(groceryItem => (
        <li key={groceryItem.id} className="list-group-item">
          {groceryItem.name}
        </li>
      ))}
    </ul>
  );
}

export default List;
