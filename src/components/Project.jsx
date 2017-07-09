import React from "react";
import WasteItemRow from "./WasteItemRow";
import WasteChart from "./WasteChart";
import WasteItemService from "../services/WasteItemService";

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    this.types = ["work", "meeting"];

    this.state = {
      wasteItems: [],
      newType: "",
      newDescription: "",
      newDuration: "",
      chartProperty: "type"
    };

    this.wasteItemService = new WasteItemService(
      this.props.project.id,
      wasteItems => {
        this.setState({ wasteItems: wasteItems });
      }
    );

    this.onChangeType = e => {
      this.setState({ newType: e.target.value });
    };

    this.onChangeDescription = e => {
      this.setState({ newDescription: e.target.value });
    };

    this.onChangeDuration = e => {
      this.setState({ newDuration: e.target.value });
    };

    this.onChangeChartProperty = e => {
      this.setState({ chartProperty: e.target.value });
    };

    this.add = () => {
      this.wasteItemService.addWasteItem(
        this.state.newType,
        this.state.newDescription,
        this.state.newDuration
      );
      this.setState({ newDescription: "", newDuration: "" });
    };

    this.delete = id => {
      this.wasteItemService.deleteWasteItem(id);
    };

    this.total = () =>
      this.state.wasteItems
        .reduce((sum, wasteItem) => sum + wasteItem.duration, 0)
        .toFixed(1);
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
        wasteItem={wasteItem}
        onDelete={() => {
          this.delete(wasteItem.id);
        }}
      />
    );

    const typeOptions = this.types.map(type =>
      <option key={type} value={type}>
        {type}
      </option>
    );

    return (
      <div>
        <h3>
          {this.props.project.name}
        </h3>
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Duration</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {wasteItemRows}
            <tr>
              <td />
              <td />
              <td />
              <td style={{ fontWeight: "bold", textAlign: "right" }}>
                {this.total()}
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <select value={this.state.newType} onChange={this.onChangeType}>
          {typeOptions}
        </select>
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
        <button
          onClick={this.add}
          disabled={!this.state.newDescription || !this.state.newDuration}
        >
          Add waste item
        </button>
        <div>
          <fieldset>
            <label>
              <input
                name="chartProperty"
                type="radio"
                value="userName"
                checked={this.state.chartProperty === "userName"}
                onChange={this.onChangeChartProperty}
              />user name
            </label>
            <label>
              <input
                name="chartProperty"
                type="radio"
                value="type"
                checked={this.state.chartProperty === "type"}
                onChange={this.onChangeChartProperty}
              />type
            </label>
          </fieldset>
          <WasteChart items={this.state.wasteItems} propertyToGroupBy={this.state.chartProperty} />
        </div>
      </div>
    );
  }
}
