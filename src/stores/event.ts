import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Event } from "interfaces/interfaces";

export const useEventStore = defineStore("islamicEvent", {
    state: () => {
        return {
            islamicEvent: [] as Event[]
        };
    },
    getters: {
        getEvent(): Event[] {
            return this.islamicEvent;
        },
    },
    actions: {
        setEvent(islamicEvent: Event[]) {
            this.islamicEvent = islamicEvent;
        },
        addIslamicEvent(islamicEvent: any) {
            this.islamicEvent.push(islamicEvent)
        },
        deleteIslamicEvent(id: number) {
            this.islamicEvent = this.islamicEvent.filter((t: { id: number; }) => {
                return t.id !== id
            })
        },
        updateEvent(id: number, name: string, eventdate: string, eventfrom: string, eventto: string){
            const event = this.islamicEvent.findIndex(event => event.id === id);
            this.islamicEvent[event].name = name;
            this.islamicEvent[event].eventDate = eventdate;
            this.islamicEvent[event].eventFrom = eventfrom;
            this.islamicEvent[event].eventTo = eventto;
        }
    },
    persist: {
        storage: sessionStorage,
    },
});