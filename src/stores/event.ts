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
    },
    persist: {
        storage: sessionStorage,
    },
});