import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Event } from "interfaces/interfaces";

export const useEventStore = defineStore("islamicEvent", {
    state: () => {
        return {
            islamicEvent: {} as Event
        };
    },
    getters: {
        getEvent(): Event {
            return this.islamicEvent;
        },
    },
    actions: {
        setEvent(islamicEvent: Event) {
            this.islamicEvent = islamicEvent;
        },
        addIslamicEvent(islamicEvent: any) {
            this.islamicEvent.push(islamicEvent)
        },
        deleteIslamicEvent(id: number) {
            this.islamicEvent = this.islamicEvent.filter((t: { id: number; }) => {
                return t.id !== id
            })
        }
    },
    persist: {
        storage: sessionStorage,
    },
});