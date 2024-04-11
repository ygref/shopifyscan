import React from "react";
import { getData } from "./dataset";

class ListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
  }

  handleItemClick(item) {
    this.setState({ selectedItem: item });
    // You can perform additional actions here when an item is clicked
  }

  render() {
    const items = getData();
    const { selectedItem } = this.state;

    return (
      <div className="list-box">
        <h2>List Box</h2>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => this.handleItemClick(item)}
              className={selectedItem === item ? "selected" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
        <p>Selected Item: {selectedItem}</p>
      </div>
    );
  }
}

export default ListBox;
