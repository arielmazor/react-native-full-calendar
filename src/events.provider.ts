import { getHours, isSameDay } from "date-fns";

export interface IEvent {
  start: number;
  end: number;
  title: string;
  summary: string;
}

const eventsProvider = (() => {
  const getSameDayEvents = (day: Date, events: IEvent[] | null) => {
    if(events) {
      return events.filter(event => {
        if(isSameDay(event.start, day)) {
          return event;
        };
      })
    }
    return [];
  }

  //------------------

  const getDayEvents = (day: Date, _events: IEvent[] | null): any[] => {
    let events: IEvent[][] | any[][] = [[], [], [], [],[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    getSameDayEvents(day, _events).forEach((event, index) => {
      const hour = getHours(event.start);
        if(!events[hour][index]) {
          events[hour][index] = event;
        }
    });

    return events;
  }

  //------------------
  
  return {
    getDayEvents
  }
})();

export default eventsProvider;