import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { PostComment } from "interfaces/interfaces";

export const postCommentStore = defineStore("postComment", {
    state: () => {
        return {
            postComment: {} as PostComment
        };
    },
    getters: {
        getPostComment(): PostComment {
            return this.postComment;
        },
    },
    actions: {
        setPostComment(postComment: PostComment) {
            this.postComment = postComment;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});

