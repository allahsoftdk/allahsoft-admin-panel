<script lang="ts">
import { usePostStore } from "../../stores/posts";
import { useUserStore } from "../../stores/user";
import { usePostCommentStore } from "../../stores/postComments";
export default {
    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const postComment = usePostCommentStore();

        return { userStore, postStore, postComment }
    }
};
</script>

<template>
    <div class="row p-3">
        <div class="col-12 shadow">
            <div class="row">
                <div class="col-4 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Total users</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ userStore.getUser.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <h6>Users today</h6>
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <h6 class="text-danger">NaN</h6>
                        </div>
                    </div>
                </div>

                <div class="col-4 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Total posts</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ postStore.getPosts.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <h6>Posts today</h6>
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <h6 class="text-danger">NaN</h6>
                        </div>
                    </div>
                </div>

                <div class="col-4 border">
                    <div class="row">
                        <div class="col-12 pt-2">
                            <h5>Total posts comments</h5>
                        </div>
                        <div class="col-12 text-success">
                            <h4>{{ postComment.getPostComment.length }}</h4>
                        </div>
                    </div>
                    <div class="row border-top bg-light pt-1">
                        <div class="col-8">
                            <h6>Comments today</h6>
                        </div>
                        <div class="col-4 text-success text-right d-flex justify-content-end">
                            <h6 class="text-danger">NaN</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.colored-toast.swal2-icon-info {
    background-color: #3fc3ee !important;
}
</style>
