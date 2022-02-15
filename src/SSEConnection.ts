import {Request, Response} from "express-serve-static-core";
import {EventGenerator} from "./EventGenerator";
import Timeout = NodeJS.Timeout;

export class SSEConnection {
  request : Request;
  response : Response;
  keepAliveTimer : Timeout;
  count = 0
  connected = false;

  _destroyed = false;
  uuid : string;

  cleanCallback : () => void;

  constructor(request: Request, response : Response, uuid: string, cleanCallback: () => void) {
    this.request       = request;
    this.response      = response;
    this.cleanCallback = cleanCallback;
    this.uuid          = uuid;

    // A HTTP connection times out after 2 minutes. To avoid this, we send keep alive messages every 30 seconds
    this.keepAliveTimer = setInterval(() => {
      // this is not used anymore since we need the ping in node environment which does not show these messages.
      // this.response.write(':ping\n\n');

      let pingEvent = { type:"ping",counter: this.count++ }
      this._transmit("data:" + JSON.stringify(pingEvent) + "\n\n");

      // if we are going to use the compression lib for express, we need to flush after a write.
      this.response.flushHeaders()
    }, 30000);

    this.request.once('close', () => {
      this.destroy(EventGenerator.getErrorEvent(408, "STREAM_CLOSED", "Event stream has been closed."));
    });

    this.connected = true;
  }


  destroy(message = "") {
    if (this._destroyed == false) {
      this._destroyed = true;
      console.log(this.uuid, "Destroy message", message);
      this.connected = false;
      clearInterval(this.keepAliveTimer);
      this.request.removeAllListeners();
      this.cleanCallback();

      try {
        this.response.end(message);
      } catch (err) {
        console.error("Tried to send a message after ending.")
      }
    }
  }

  dispatch(dataStringified: string) {
    this._transmit("data:" + dataStringified + "\n\n");
  }

  _transmit(data : string) {
    this.response.write(data);
    // if we are going to use the compression lib for express, we need to flush after a write.
    this.response.flushHeaders()
  }

}