<script lang="ts">
import axios from "axios";
import { mapStores } from "pinia";
import { postStore } from "../../stores/posts";
import { userStore } from "../../stores/user";
import { postCommentStore } from "../../stores/postComments";
export default {
    data() {
        return {}
    },
    computed: {
        ...mapStores(userStore),
        ...mapStores(postStore),
        ...mapStores(postCommentStore),
    },
    methods: {
        async fetchAllUsers() {
            axios({
                method: "get",
                url: "http://localhost/api/user/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.userStore.setUser(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchAllPosts() {
            axios({
                method: "get",
                url: "http://localhost/api/post/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.postStore.setPosts(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchAllPostComments() {
            axios({
                method: "get",
                url: "http://localhost/api/post_comment/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.postCommentStore.setPostComment(res.data);
                })
                .catch((err) => console.log(err));
        },
    },
    created() {
        Promise.all([this.fetchAllUsers(), this.fetchAllPosts(), this.fetchAllPostComments()]).then((res) => { });
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
                            <h4>{{ postCommentStore.getPostComment.length }}</h4>
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
