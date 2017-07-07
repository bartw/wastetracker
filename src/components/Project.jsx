import React from "react";
import { render } from "react-dom";
import WasteItemRow from "./WasteItemRow";
import WasteItemService from "../services/WasteItemService";

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wasteItems: [],
      newWasteItemName: ""
    };

    this.wasteItemService = new WasteItemService(
      props.project.id,
      wasteItems => {
        this.setState({ wasteItems: wasteItems });
      }
    );

    this.onChangeWasteItemName = e => {
      this.setState({ newWasteItemName: e.target.value });
    };

    this.add = () => {
      this.wasteItemService.addWasteItem(this.state.newWasteItemName);
      this.setState({ newWasteItemName: "" });
    };

    this.delete = id => {
      this.wasteItemService.deleteWasteItem(id);
    };
  }

  componentWillReceiveProps(nextProps) {
    this.wasteItemService.dispose();
    this.setState({ wasteItems: [] });
    this.wasteItemService = new WasteItemService(
      nextProps.project.id,
      wasteItems => {
        this.setState({ wasteItems: wasteItems });
      }
    );
  }

  render() {
    const wasteItemRows = this.state.wasteItems.map(wasteItem =>
      <WasteItemRow
        key={wasteItem.id}
        name={wasteItem.name}
        onDelete={() => {
          this.delete(wasteItem.id);
        }}
      />
    );
    return (
      <div>
        <table>
          <tbody>
            {wasteItemRows}
          </tbody>
        </table>
        <input
          type="text"
          value={this.state.newWasteItemName}
          onChange={this.onChangeWasteItemName}
        />
        <button onClick={this.add} disabled={!this.state.newWasteItemName}>
          Add waste item
        </button>
      </div>
    );
  }
}
