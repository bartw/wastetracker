import React from 'react';
import WasteItemRow from './WasteItemRow';
import WasteChart from './WasteChart';
import WasteItemService from '../services/WasteItemService';

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wasteItems: [],
      newDescription: '',
      newDuration: ''
    };

    this.wasteItemService = new WasteItemService(
      this.props.project.id,
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

    this.total = () => this.state.wasteItems.reduce((sum, wasteItem) => sum + wasteItem.duration, 0).toFixed(1);
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
        <h3>{this.props.project.name}</h3>
        <table>
          <thead>
              <tr>
                <th>User name</th>
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
              <td style={{fontWeight: 'bold', textAlign: 'right'}}>{this.total()}</td>
              <td />
            </tr>
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
        <WasteChart items={this.state.wasteItems} />
      </div>
    );
  }
}
