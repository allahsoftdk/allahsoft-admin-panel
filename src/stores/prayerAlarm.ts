import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { PrayerAlarm } from "interfaces/interfaces";

export const usePrayerAlarmStore = defineStore("prayerAlarm", {
    state: () => {
        return {
            alarm: {} as PrayerAlarm
        };
    },
    getters: {
        getPrayerAlarm(): PrayerAlarm {
            return this.alarm;
        },
    },
    actions: {
        setPrayerAlarm(alarm: PrayerAlarm) {
            this.alarm = alarm;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});

