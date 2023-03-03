import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Role } from "interfaces/interfaces";

export const useRoleStore = defineStore("role", {
    state: () => {
        return {
            role: {} as Role
        };
    },
    getters: {
        getRole(): Role {
            return this.role;
        },
    },
    actions: {
        setRole(Role: Role) {
            this.role = Role;
        },
        addRole(role: any) {
            this.role.push(role)
        },
        deleteRole(id: number) {
            this.role = this.role.filter((t: { id: number; }) => {
                t.id !== id
            })
        }
    },
    persist: {
        storage: sessionStorage,
    },
});

