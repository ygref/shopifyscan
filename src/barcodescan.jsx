import { useState } from "react";

function BarcodeScanner() {
  const [barcode, setBarcode] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Barcode scanned or entered, trigger action
      searchOrSubmit(barcode);
    }
  };

  const handleButtonClick = () => {
    // Trigger action when the button is clicked
    searchOrSubmit(barcode);
  };

  const searchOrSubmit = (value) => {
    // Implement search or submission logic here
    console.log("Searching or submitting:", value);
  };

  return (
    <div>
      <input
        type="text"
        value={barcode}
        onChange={(event) => setBarcode(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scan barcode..."
      />
      <button onClick={handleButtonClick}>Search/Submit</button>
    </div>
  );
}

export default BarcodeScanner;
