import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Post } from "interfaces/interfaces";

export const usePostStore = defineStore("post", {
    state: () => {
        return {
            post: {} as Post
        };
    },
    getters: {
        getPosts(): Post {
            return this.post;
        },
    },
    actions: {
        setPosts(post: Post) {
            this.post = post;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});

