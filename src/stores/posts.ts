import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Post } from "interfaces/interfaces";

export const usePostStore = defineStore("post", {
    state: () => {
        return {
            post: [] as Post[]
        };
    },
    getters: {
        getPosts(): Post[] {
            return this.post;
        },
        getPostById: (state) => {
            return (userId) => state.post.find((post) => post.id === userId)
          },
    },
    actions: {
        setPosts(post: Post[]) {
            this.post = post;
        },
        deletePost(id: number) {
            this.post = this.post.filter((t) => {
                return t.id !== id
            })
        },
        deletePostLinkedToUser(userId: number) {
            this.post = this.post.filter((t) => {
                return t.userId !== userId
            })
        }
    },
    persist: {
        storage: sessionStorage,
    },
});

