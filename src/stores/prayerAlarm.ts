import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { PrayerAlarm } from "interfaces/interfaces";

export const usePrayerAlarmStore = defineStore("prayerAlarm", {
    state: () => {
        return {
            alarm: [] as PrayerAlarm[]
        };
    },
    getters: {
        getPrayerAlarm(): PrayerAlarm[] {
            return this.alarm;
        },
    },
    actions: {
        setPrayerAlarm(alarm: PrayerAlarm[]) {
            this.alarm = alarm;
        },
        addAlarm(alarm: PrayerAlarm) {
            this.alarm.push(alarm)
        },
        deletePrayerAlarm(id: number) {
            this.alarm = this.alarm.filter((t) => {
               return t.id !== id
            })
        },
        updatePrayerAlarm(id: number, name: string){
            const alarm = this.alarm.findIndex(prayerAlarm => prayerAlarm.id === id);
            this.alarm[alarm].prayerAlarm = name
        }
    },
    persist: {
        storage: sessionStorage,
    },
});

