import * as firebase from "firebase";

export default class WasteItemService {
  constructor(projectId, onChanged) {
    let wasteItems = [];
    const dbContext = firebase.database().ref(projectId);

    const callOnChanged = () => {
      onChanged(
        wasteItems.map(wasteItem => {
          return { id: wasteItem.id, name: wasteItem.name };
        })
      );
    };

    dbContext.on("child_added", data => {
      wasteItems = wasteItems.concat([
        { id: data.key, name: data.val().name, ref: data.ref }
      ]);
      callOnChanged();
    });

    dbContext.on("child_removed", data => {
      wasteItems = wasteItems.filter(wasteItem => wasteItem.id !== data.key);
      callOnChanged();
    });

    this.addWasteItem = name => {
      if (!name) {
        return;
      }
      const newWasteItem = dbContext.push();
      newWasteItem.set({
        name: name
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
