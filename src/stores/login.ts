import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Login } from "interfaces/interfaces";

export const useLoginStore = defineStore("login", {
    state: () => {
        return {
            user: [] as Login[]
        };
    },
    getters: {
        getUserLogin(): Login[] {
            return this.user;
        },
    },
    actions: {
        setUserLogin(user: Login[]) {
            this.user = user;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});

