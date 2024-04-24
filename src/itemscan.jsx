import React, { useState, useEffect } from "react";
import axios from "axios";

function ItemScanner() {
  const [inputValue, setInputValue] = useState("");
  // const [itemInfo, setItemInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const fetchItemInfo = async () => {
      try {
        console.log("Fetching item information for input value:", inputValue);
        const response = await axios.get(`http://localhost:5000/api/items/barcode/${inputValue}`);
        const newItem = response.data;
        setItems((prevItems) => [...prevItems, newItem]);
        // setItemInfo(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching item information");
      }
    };

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    if (inputValue.trim() !== "") {
      const newTimeout = setTimeout(() => {
        fetchItemInfo(inputValue);
      }, 1000); // Adjust the delay as needed (e.g., 500 milliseconds)
      setTypingTimeout(newTimeout);
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any additional validation if needed
    // Then update state or trigger API request
    // For now, let the useEffect handle the API request
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Input" />
        <button type="submit">Search/Submit</button>
      </form>
      {error && <p>{error}</p>}
      {items.map((item, index) => (
        <div key={index}>
          <p>Item Barcode: {item.barcode}</p>
          <p>Item ID: {item.id}</p>
          <p>Item Name: {item.name}</p>
          <p>Item Price: {item.price}</p>
          <p>Item Description: {item.description}</p>
          {/* Add more item information as needed */}
        </div>
      ))}
    </div>
  );
}

export default ItemScanner;
