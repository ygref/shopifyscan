import BarcodeScanner from "./barcodescan";
import ListBox from "./listbox";
import { getData } from "./dataset";

export function App() {
  const items = getData();

  return (
    <div className="App">
      <BarcodeScanner />
      <ListBox items={items} />
    </div>
  );
}

export default App;
