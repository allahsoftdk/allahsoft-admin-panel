import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { PostComment } from "interfaces/interfaces";

export const usePostCommentStore = defineStore("postComment", {
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
        deletePostComment(id: number) {
            this.postComment = this.postComment.filter((t: { id: number; }) => {
                return t.id !== id
            })
        }
    },
    persist: {
        storage: sessionStorage,
    },
});

