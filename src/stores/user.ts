import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      user: null,
    };
  },
  getters: {
    getUser(): any {
      return this.user;
    },
  },
  actions: {
    setUser(user: any) {
      this.user = user;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
