import React from "react";
import { render } from "react-dom";
import WasteItemRow from "./WasteItemRow";
import WasteItemService from "../services/WasteItemService";

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wasteItems: [],
      newDescription: '',
      newDuration: ''
    };

    this.wasteItemService = new WasteItemService(
      props.project.id,
      wasteItems => {
        this.setState({ wasteItems: wasteItems });
      }
    );

    this.onChangeDescription = e => {
      this.setState({ newDescription: e.target.value });
    };

    this.onChangeDuration = e => {
      this.setState({ newDuration: e.target.value });
    };

    this.add = () => {
      this.wasteItemService.addWasteItem(this.state.newDescription, this.state.newDuration);
      this.setState({ newDescription: '', newDuration: '' });
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
        userName={wasteItem.userName}
        description={wasteItem.description}
        duration={wasteItem.duration}
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
          value={this.state.newDescription}
          onChange={this.onChangeDescription}
          placeholder="description"
        />
        <input
          type="number"
          value={this.state.newDuration}
          onChange={this.onChangeDuration}
          placeholder="duration"
        />
        <button onClick={this.add} disabled={!this.state.newDescription || !this.state.newDuration}>
          Add waste item
        </button>
      </div>
    );
  }
}
