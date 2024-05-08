import React, { useState, useEffect } from "react";
import axios from "axios";

function ItemScanner() {
  const [inputValue, setInputValue] = useState("");
  const [scannedItems, setScannedItems] = useState([]);
  const [error, setError] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // useEffect(() => {
  //   const fetchItemInfo = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/items/barcode/${inputValue}`);
  //       const newItem = response.data;
  //       setItems((prevItems) => [...prevItems, newItem]);
  //       // setItemInfo(response.data);
  //       setError(null);
  //     } catch (error) {
  //       setError("Error fetching item information");
  //     }
  //   };

  useEffect(() => {
    const fetchItemInfo = async () => {
      try {
        console.log("Fetching item information for input value:", inputValue);
        const response = await axios.get(`http://localhost:5000/api/items/barcode/${inputValue}`);
        const newItemInfo = response.data;
        setItemInfo(newItemInfo);
        setError(null);
        const scannedItemIndex = scannedItems.findIndex((item) => item.id === newItemInfo.id);
        if (scannedItemIndex !== -1) {
          // Increment quantity if item already exists
          const updatedScannedItems = [...scannedItems];
          updatedScannedItems[scannedItemIndex].quantity++;
          setScannedItems(updatedScannedItems);
        } else {
          // Add new scanned item
          setScannedItems([...scannedItems, { ...newItemInfo, quantity: 1 }]);
        }
      } catch (error) {
        setError("Error fetching item information");
        setItemInfo(null);
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
      {itemInfo && (
        <div>
          <p>Item Barcode: {itemInfo.barcode}</p>
          <p>Item ID: {itemInfo.id}</p>
          <p>Item Name: {itemInfo.name}</p>
          <p>Item Price: {itemInfo.price}</p>
          <p>Item Description: {itemInfo.description}</p>
          {/* Display other item information here */}
        </div>
      )}
      {scannedItems.length > 0 && (
        <div>
          <h2>Scanned Items</h2>
          <ul>
            {scannedItems.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ItemScanner;
