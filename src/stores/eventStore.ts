import { makeAutoObservable } from 'mobx';

import { Event, EventSourceEnum } from '../types/event';
import { getEvents } from '../services/apiService';

export class EventStore {
  events: Event[] = [];

  selectedEvent: Event | null = null
  
  loading: boolean = false;

  error: string | null = null;

  selectedEventError: string | null = null

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
    this.loading = true;
    this.error = null;

    try {
      const response = await getEvents();
      this.events = response.events;
    } catch(err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  get eventsByCategory(): Record<string, Event[]> {
    return this.events.reduce((acc, crr) => {
      if(acc[crr.category]) {
        acc[crr.category] = [
          ...acc[crr.category],
          crr,
        ];
      } else {
        acc[crr.category] = [crr];
      }
      return acc;
    }, {} as Record<string, Event[]>);
  }

  getSelectedEvent(id: string, source: EventSourceEnum) {
    this.selectedEvent = this.events.find(event => event.id === id && event.source === source) ?? null
    if(!this.selectedEvent) {
      this.selectedEventError = "Event not found"
    }
  }

  clearSelectedEvent() {
    this.selectedEvent = null
    this.selectedEventError = null
  }
}

export const eventStore = new EventStore();
