

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
    let event = {
      type:   "event",
      topic:  topic,
      data:   data,
    };
    return "data:" + JSON.stringify(event) + '\n\n';
  },

  getCallFailEvent(callId: string, error: any) {
    let event = {
      type:   "failCall",
      callId: callId,
      error:  error,
    };
    return "data:" + JSON.stringify(event) + '\n\n';
  },

  getCallSuccessEvent(callId: string, data: any) {
    let event = {
      type:  "succeedCall",
      callId: callId,
      data:   data,
    };
    return "data:" + JSON.stringify(event) + '\n\n';
  }
}