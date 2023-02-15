import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore("user", () => {
    const user = ref(0);
    function getUser() {
        return this.user;
    }
    function setUser(user: any) {
        this.user = user;
    }
    return { user, getUser, setUser };
});


interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}
