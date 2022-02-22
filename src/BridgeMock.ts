import {EventDispatcher} from "./EventDispatcher";
import {EventGenerator} from "./EventGenerator";

export class BridgeMock {

  pendingCalls      : Record<string, {function: string, args: any[], tStart: number, tEnd: number | null}> = {};
  finishedCalls     : Record<string, {function: string, args: any[], tStart: number, tEnd: number | null, autoResolve?: boolean}> = {};
  bluenetCalls      : {function: string, args: any[], tCalled: number}[] = [];

  functionHandleMap : Record<string, Record<string, string>> = {};
  functionIdMap     : Record<string, string[]> = {};


  autoResolveMethods : Record<string,any> = {
    'canUseDynamicBackgroundBroadcasts': false,
    'requestLocation': {},
    'isReady': true,
    'isDevelopmentEnvironment': true,
    'isPeripheralReady': true,
    'setKeySets': true,
    'clearTrackedBeacons': true,
    'clearFingerprintsPromise': true,
  }
  constructor() {}


  reset() {
    this.pendingCalls      = {};
    this.functionHandleMap = {};
    this.functionIdMap     = {};
    this.finishedCalls     = {};
    this.bluenetCalls      = [];
  }

  addBluenetCall(data: {function: string, args: any[], tCalled: number}) {
    this.bluenetCalls.push(data)
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

    if (this.autoResolveMethods[data.function] !== undefined) {
      this.succeedById(data.id, this.autoResolveMethods[data.function]);
    }
  }


  failCall(data: {handle: string | null, function: string, error: string}) {
    if (data.handle) {
      let callId = this.functionHandleMap[data.function][data.handle];
      EventDispatcher.dispatch(EventGenerator.getCallFailEvent(callId,data.error));
      this.finishedCalls[callId] = this.pendingCalls[callId];
      this.finishedCalls[callId].tEnd = Date.now();
      this.finishedCalls[callId].autoResolve = false;

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
      this.finishedCalls[callId].autoResolve = false;

      delete this.pendingCalls[callId];
      delete this.functionHandleMap[data.function][data.handle];

      return;
    }

    for (let id of this.functionIdMap[data.function]) {
      EventDispatcher.dispatch(EventGenerator.getCallSuccessEvent(id,data.data));
    }
  }

  succeedById(callId: string, result: any, autoResolve = true) {
    let callData = this.pendingCalls[callId];
    this.finishedCalls[callId] = this.pendingCalls[callId];
    this.finishedCalls[callId].tEnd = Date.now()
    this.finishedCalls[callId].autoResolve = autoResolve;

    EventDispatcher.dispatch(EventGenerator.getCallSuccessEvent(callId, result));

    if (callData.args.length > 0) {
      delete this.functionHandleMap[callData.function][callData.args[0]];
    }

    delete this.pendingCalls[callId];
  }

  getFunctionCalls(functionName: string) {
    let pending = [];
    for (let id in this.pendingCalls) {
      if (this.pendingCalls[id].function === functionName) {
        pending.push({t: this.pendingCalls[id].tStart, args: this.pendingCalls[id].args})
      }
    }
    let finished = [];
    for (let id in this.finishedCalls) {
      if (this.finishedCalls[id].function === functionName) {
        finished.push({t: this.finishedCalls[id].tStart, args: this.finishedCalls[id].args})
      }
    }
    let bluenet = [];
    for (let call of this.bluenetCalls) {
      if (call.function === functionName) {
        bluenet.push({t: call.tCalled, args: call.args})
      }
    }
    return {pending, finished, bluenet};
  }
}