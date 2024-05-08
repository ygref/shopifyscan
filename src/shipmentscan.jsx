import { useState, useEffect } from "react";
import axios from "axios";

function ShipmentScanner({ onShipmentScanned, mode }) {
  const [shipment, setShipment] = useState("");
  const [shipmentInfo, setShipmentInfo] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchOrSubmit(shipment, mode);
    }
  };

  const handleButtonClick = () => {
    searchOrSubmit(shipment, mode);
  };

  const searchOrSubmit = async (value, mode) => {
    try {
      console.log(`Searching or submitting: ${value} in mode ${mode}`);
      const response = await axios.get(`http://localhost:5000/api/shipment/${value}`);
      const fetchedShipmentInfo = response.data;
      setShipmentInfo(fetchedShipmentInfo);
      onShipmentScanned(fetchedShipmentInfo);
    } catch (error) {
      console.error("Error fetching shipment information:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={shipment}
        onChange={(event) => setShipment(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find Here..."
      />
      <button onClick={handleButtonClick}>Search/Submit</button>
      {shipmentInfo && (
        <div>
          <h2>Order Info:</h2>
          <p>Order Number: {shipmentInfo.id}</p>
          <p>Shipment Date: {shipmentInfo.date}</p>
          <p>Shipment Items:</p>
          <ul>
            {shipmentInfo.items.map((item) => (
              <li key={item.id}>
                <p> Item Name: </p>
                {item.name} <p> Quantity </p>
                {item.quantity} <p>Price: </p>
                {item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default ShipmentScanner;
