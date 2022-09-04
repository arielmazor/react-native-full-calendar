import EventEmitter, { ValidEventTypes } from "eventemitter3";
const eventEmitter = new EventEmitter();

export const subscribeTo = (name: string, cb: (...args: any[]) => void, origin?: string) => {
  if (__DEV__) {
    console.log("subscribing:" + name, origin);
  }
  eventEmitter.on(name, cb);
}

export const trigger = (name: string, ...args: EventEmitter.EventArgs<ValidEventTypes, any>) => {
  if (__DEV__) {
    console.log("triggering:", name);
  }
  eventEmitter.emit(name, args[0]);
}