import React from "react";

export default function SelectCategory({
  handleCategoryChange,
  selectedCategory,
  categoryData,
}) {
  return (
    <select onChange={handleCategoryChange} value={selectedCategory}>
      {Object.keys(categoryData).map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
