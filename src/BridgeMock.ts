import {EventDispatcher} from "./EventDispatcher";
import {EventGenerator} from "./EventGenerator";

export class BridgeMock {

  pendingCalls      : Record<string, {function: string, args: any[], tStart: number, tEnd: number | null}> = {};
  functionHandleMap : Record<string, Record<string, string>> = {};
  functionIdMap     : Record<string, string[]> = {};
  finishedCalls     : Record<string, {function: string, args: any[], tStart: number, tEnd: number | null}> = {};

  constructor() {}


  reset() {
    this.pendingCalls      = {};
    this.functionHandleMap = {};
    this.functionIdMap     = {};
    this.finishedCalls     = {};
  }


  addCall(data: {id: string, function: string, args: any[]}) {
    this.pendingCalls[data.id] = {function: data.function, args: data.args, tStart: Date.now(), tEnd: null };
    if (this.functionHandleMap[data.function] === undefined) {
      this.functionHandleMap[data.function] = {};
    }
    if (this.functionIdMap[data.function] === undefined) {
      this.functionIdMap[data.function] = [];
    }

    if (data.args.length > 0) {
      this.functionHandleMap[data.function][data.args[0]] = data.id;
    }

    this.functionIdMap[data.function].push(data.id);
  }


  failCall(data: {handle: string | null, function: string, error: string}) {
    if (data.handle) {
      let callId = this.functionHandleMap[data.function][data.handle];
      EventDispatcher.dispatch(EventGenerator.getCallFailEvent(callId,data.error));
      this.finishedCalls[callId] = this.pendingCalls[callId];
      this.finishedCalls[callId].tEnd = Date.now();

      delete this.pendingCalls[callId];
      delete this.functionHandleMap[data.function][data.handle];

      return;
    }

    for (let id of this.functionIdMap[data.function]) {
      EventDispatcher.dispatch(EventGenerator.getCallFailEvent(id,data.error));
    }
  }


  succeedCall(data: {handle: string | null, function: string, data: any}) {
    if (data.handle) {
      let callId = this.functionHandleMap[data.function][data.handle];
      EventDispatcher.dispatch(EventGenerator.getCallSuccessEvent(callId,data.data));
      this.finishedCalls[callId] = this.pendingCalls[callId];
      this.finishedCalls[callId].tEnd = Date.now();

      delete this.pendingCalls[callId];
      delete this.functionHandleMap[data.function][data.handle];

      return;
    }

    for (let id of this.functionIdMap[data.function]) {
      EventDispatcher.dispatch(EventGenerator.getCallSuccessEvent(id,data.data));
    }
  }
}