import { useState } from "react";

function ShipmentScanner({ mode }) {
  const [shipment, setShipment] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchOrSubmit(shipment, mode);
    }
  };

  const handleButtonClick = () => {
    searchOrSubmit(shipment, mode);
  };

  const searchOrSubmit = (value, mode) => {
    console.log(`Searching or submitting: ${value} in mode ${mode}`);
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
    </div>
  );
}

export default ShipmentScanner;
