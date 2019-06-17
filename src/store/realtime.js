import io from "socket.io-client";
import config from "../config/app.js";

const opts = {
  forceNew: true
};

export default (store) => {

  let socket = io(config.realtimeServerAddress, opts);

  socket.on("connect", () => {
    console.log("Connected to realtime server");
    window.raffleSocket = socket;
  });

  /**
   * Sample code:
   */
  socket.on("new-action", (action) => {
    console.log('From RTC: ', action);
    switch(action.type) {
      case 'update-board': {
        //build std pickedCell data
        let stdPickedCells = {};
        for(let cellId in action.payload.latestPickedCells) {
          stdPickedCells[cellId] = {
            treasure_type: action.payload.latestPickedCells[cellId]
          }
        }
        store.dispatch({
          type: 'treasure.updateBoard',
          payload: {
            ...action.payload,
            latestPickedCells: stdPickedCells
          }
        });
        break;
      }
      default: {
        console.log("Receive unknown action type: ", action);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Connection was closed");
  });
}
