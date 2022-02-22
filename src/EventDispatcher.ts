import {Request, Response} from "express-serve-static-core";
import {Util} from "./util/util";
import {SSEConnection} from "./SSEConnection";
import {EventGenerator} from "./EventGenerator";

interface ClientMap {
  [key: string] : SSEConnection
}

export class EventDispatcherClass {

  clients    : ClientMap  = {};

  constructor() {}

  /**
   * This is where the data is pushed from the socket connection with the Crownstone cloud.
   * From here it should be distributed to the enduser.
   * @param eventData
   */
  dispatch(eventData : any) {
    let preparedEventString = JSON.stringify(eventData);
    for (let clientId in this.clients) {
      this.clients[clientId].dispatch(preparedEventString)
    }
  }

  addClient(request : Request, response: Response) {
    let uuid = Util.getUUID();
    this.clients[uuid] = new SSEConnection(
      request,
      response,
      uuid,
      () => {
        delete this.clients[uuid];
      }
    );
  }

  destroy() {
    Object.keys(this.clients).forEach((clientId) => {
      this.clients[clientId].destroy(EventGenerator.getErrorEvent(500, "STREAM_CLOSED", "Server stopping. Try again later."));
    });
  }
}

export const EventDispatcher = new EventDispatcherClass();
