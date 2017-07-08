import * as firebase from "firebase";
import AuthenticationService from "../services/AuthenticationService";

export default class WasteItemService {
  constructor(projectId, onChanged) {
    let wasteItems = [];
    const dbContext = firebase.database().ref(projectId);
    const userName = new AuthenticationService().getUserName();

    const callOnChanged = () => {
      onChanged(
        wasteItems.map(wasteItem => {
          return { id: wasteItem.id, userName: wasteItem.userName, description: wasteItem.description, duration: wasteItem.duration };
        })
      );
    };

    dbContext.on("child_added", data => {
      wasteItems = wasteItems.concat([
        { id: data.key, userName: data.val().userName, description: data.val().description, duration: data.val().duration, ref: data.ref }
      ]);
      callOnChanged();
    });

    dbContext.on("child_removed", data => {
      wasteItems = wasteItems.filter(wasteItem => wasteItem.id !== data.key);
      callOnChanged();
    });

    this.addWasteItem = (description, duration) => {
      if (!description || !duration) {
        return;
      }
      const newWasteItem = dbContext.push({
        userName: userName,
        description: description,
        duration: duration
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
