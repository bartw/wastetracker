import * as firebase from "firebase";
import AuthenticationService from "../services/AuthenticationService";

export default class WasteItemService {
  constructor(projectId, onChanged) {
    let wasteItems = [];
    const dbContext = firebase.database().ref('wasteitems/' + projectId);
    const userName = new AuthenticationService().getUserName();

    const callOnChanged = () => {
      onChanged(
        wasteItems.map(wasteItem => {
          return { id: wasteItem.id, userName: wasteItem.userName, type: wasteItem.type, description: wasteItem.description, duration: wasteItem.duration };
        })
      );
    };

    dbContext.on("child_added", data => {
      wasteItems = wasteItems.concat([
        { id: data.key, userName: data.val().userName, type: data.val().type, description: data.val().description, duration: parseFloat(data.val().duration), ref: data.ref }
      ]);
      callOnChanged();
    });

    dbContext.on("child_removed", data => {
      wasteItems = wasteItems.filter(wasteItem => wasteItem.id !== data.key);
      callOnChanged();
    });

    this.addWasteItem = (type, description, duration) => {
      if (!type || !description || !duration) {
        return;
      }
      const newWasteItem = dbContext.push({
        userName: userName,
        type: type,
        description: description,
        duration: parseFloat(duration).toFixed(1)
      });
    };

    this.deleteWasteItem = id => {
      const wasteItemToDelete = wasteItems.find(wasteItem => wasteItem.id === id);
      if (wasteItemToDelete) {
        wasteItemToDelete.ref.remove();
      }
    };

    this.dispose = () => {
      dbContext.off("child_added");
      dbContext.off("child_removed");
    }
  }
}
