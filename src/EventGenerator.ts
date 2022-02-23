

export const EventGenerator = {

  getStartEvent() : string {
    let startEvent: SystemEvent = {
      type:    "system",
      subType: "STREAM_START",
      code:     200,
      message: "Stream Starting."
    };
    return "data:" + JSON.stringify(startEvent) + '\n\n';
  },

  getErrorEvent(code : number, subType: SystemSubType, message: string) : string {
    let event: SystemEvent = {
      type:    "system",
      subType:  subType,
      code:     code,
      message:  message,
    };
    return "data:" + JSON.stringify(event) + '\n\n';
  },

  getNativeBusEvent(topic: string, data: any) {
    return {
      type:   "event",
      topic:  topic,
      data:   data,
    };
  },

  getCallFailEvent(callId: string, error: any) {
    return {
      type:   "failCall",
      callId: callId,
      error:  error,
    };
  },

  getCallGeneratedEvent(type: string) {
    return {
      type:    "callAdded",
      subType: type
    };
  },

  getCallSuccessEvent(callId: string, data: any) {
    return {
      type:  "succeedCall",
      callId: callId,
      data:   data,
    };
  }
}