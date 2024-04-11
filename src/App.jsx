import BarcodeScanner from "./barcodescan";
import ListBox from "./listbox";
import { getData } from "./dataset";
import { useState } from "react";

export function App() {
  const [mode, setMode] = useState(null);
  const items = getData();

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };
  return (
    <div className="App">
      <BarcodeScanner mode={mode} />
      <ListBox items={items} onModeChange={handleModeChange} />
    </div>
  );
}

export default App;
