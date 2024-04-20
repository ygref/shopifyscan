import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function ItemScanner() {
  const [items, setItems] = useState("");
  const [itemInfo, setItemInfo] = useState(null); // State to store item information
  const [error, setError] = useState(null); // State to handle errors

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchOrSubmit(items);
    }
  };

  const handleButtonClick = () => {
    searchOrSubmit(items);
  };

  const searchOrSubmit = async (value) => {
    try {
      // Make HTTP request to backend to fetch item info
      const response = await axios.get(`http://localhost:5173/api/items`); // Adjust the URL as per your backend API
      setItemInfo(response.data); // Update state with item information
      setError(null); // Clear any previous error
    } catch (error) {
      setError("Error fetching item information"); // Set error state
      setItemInfo(null); // Clear item info
    }
  };

  return (
    <div>
      <input
        type="text"
        value={items}
        onChange={(event) => setItems(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find Here..."
      />
      <button onClick={handleButtonClick}>Search/Submit</button>
      {error && <p>{error}</p>}
      {itemInfo && (
        <div>
          <p>Item Price: {itemInfo.price}</p>
          <p>Item Name: {itemInfo.name}</p>
          <p>Item Description: {itemInfo.description}</p>
          {/* Display other item information here */}
        </div>
      )}
    </div>
  );
}

export default ItemScanner;
