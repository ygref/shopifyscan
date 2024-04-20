import ShipmentScanner from "./shipmentscan";
import ListBox from "./listbox";
import { getScan } from "./dataset";
import { useState } from "react";
import ItemScanner from "./itemscan";

export function App() {
  const [mode, setMode] = useState(null);
  const items = getScan();

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };
  return (
    <div className="App">
      <ListBox items={items} onModeChange={handleModeChange} />
      <ShipmentScanner mode={mode} />
      <ItemScanner />
    </div>
  );
}

export default App;
