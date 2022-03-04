import {EventDispatcher} from "./EventDispatcher";
import {EventGenerator} from "./EventGenerator";

export class BridgeMock {

  pendingCalls      : Record<string, {function: string, args: any[], tStart: number, tEnd: number | null}> = {};
  finishedCalls     : Record<string, {function: string, args: any[], tStart: number, tEnd: number | null, resolveType?: string}> = {};
  bluenetCalls      : {function: string, args: any[], tCalled: number, performType?: string}[] = [];

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
  };

  nativeResolveMethods : Record<string,any> = {
    'getLaunchArguments': true,
  };
  bluenetCallMethods : Record<string,any> = {
    'quitApp': true
  };


  constructor() {}


  reset() {
    this.pendingCalls      = {};
    this.functionHandleMap = {};
    this.functionIdMap     = {};
    this.finishedCalls     = {};
    this.bluenetCalls      = [];
  }

  addBluenetCall(data: {function: string, args: any[]}) {
    this.bluenetCalls.push({...data, tCalled: Date.now()});
    EventDispatcher.dispatch(EventGenerator.getCallGeneratedEvent('bluenet'));

    if (this.bluenetCallMethods[data.function] !== undefined) {
      EventDispatcher.dispatch(EventGenerator.getBluenetCallEvent(data.function, data.args));
      this.bluenetCalls[this.bluenetCalls.length - 1].performType = 'native';
    }
    else {
      this.bluenetCalls[this.bluenetCalls.length - 1].performType = 'auto';
    }
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

    if (this.nativeResolveMethods[data.function] !== undefined) {
      this.nativeResolveById(data.id);
    }

    EventDispatcher.dispatch(EventGenerator.getCallGeneratedEvent('promise'));
  }


  failCall(data: {handle: string | null, function: string, error: string}) {
    if (data.handle) {
      let callId = this.functionHandleMap[data.function][data.handle];
      EventDispatcher.dispatch(EventGenerator.getCallFailEvent(callId,data.error));
      this.finishedCalls[callId] = this.pendingCalls[callId];
      this.finishedCalls[callId].tEnd = Date.now();
      this.finishedCalls[callId].resolveType = 'manual';

      this._cleanup(data.function, callId);
      return;
    }

    for (let id of this.functionIdMap[data.function]) {
      EventDispatcher.dispatch(EventGenerator.getCallFailEvent(id,data.error));
    }
    this.functionIdMap[data.function] = [];
  }


  succeedCall(data: {handle: string | null, function: string, data: any}) {
    if (data.handle) {
      let callId = this.functionHandleMap[data.function][data.handle];
      EventDispatcher.dispatch(EventGenerator.getCallSuccessEvent(callId,data.data));
      this.finishedCalls[callId] = this.pendingCalls[callId];
      this.finishedCalls[callId].tEnd = Date.now();
      this.finishedCalls[callId].resolveType = 'manual';

      this._cleanup(data.function, callId);
      return;
    }

    for (let id of this.functionIdMap[data.function]) {
      EventDispatcher.dispatch(EventGenerator.getCallSuccessEvent(id,data.data));
    }
    this.functionIdMap[data.function] = [];
  }

  succeedById(callId: string, result: any, autoResolve = true) {
    let callData = this.pendingCalls[callId];
    this.finishedCalls[callId] = this.pendingCalls[callId];
    this.finishedCalls[callId].tEnd = Date.now()
    this.finishedCalls[callId].resolveType = 'autoresolve';

    EventDispatcher.dispatch(EventGenerator.getCallSuccessEvent(callId, result));

    this._cleanup(callData.function, callId);
  }

  nativeResolveById(callId: string) {
    let callData = this.pendingCalls[callId];
    this.finishedCalls[callId] = this.pendingCalls[callId];
    this.finishedCalls[callId].tEnd = Date.now()
    this.finishedCalls[callId].resolveType = 'native';

    EventDispatcher.dispatch(EventGenerator.getNativeResolveEvent(callId));

    this._cleanup(callData.function, callId);
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


  _cleanup(functionName: string, callId: string) {
    if (this.functionIdMap[functionName]) {
      let index = this.functionIdMap[functionName].indexOf(callId);
      if (index !== -1) {
        this.functionIdMap[functionName].splice(index, 1)
      }
    }

    for (let handle in this.functionHandleMap[functionName]) {
      if (this.functionHandleMap[functionName][handle] === callId) {
        delete this.functionHandleMap[functionName][handle];
      }
    }

    delete this.pendingCalls[callId];
  }
}