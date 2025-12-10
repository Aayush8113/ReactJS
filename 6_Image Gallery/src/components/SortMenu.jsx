import React from "react";
import "../style/SortMenu.css";

export default function SortMenu({ sortType, setSortType }) {
  return (
    <select
      className="sort-menu"
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
    >
      <option value="none">Sort By</option>
      <option value="price-low">Price: Low → High</option>
      <option value="price-high">Price: High → Low</option>
      <option value="rating">Rating</option>
      <option value="az">A → Z</option>
      <option value="za">Z → A</option>
    </select>
  );
}
