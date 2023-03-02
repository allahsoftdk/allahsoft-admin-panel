<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { usePostStore } from "../../stores/posts";
import { useUserStore } from "../../stores/user";
import { usePostCommentStore } from "../../stores/postComments";
import { usePrayerAlarmStore } from "../../stores/prayerAlarm";
export default {
    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const postComment = usePostCommentStore();
        const prayerAlarm = usePrayerAlarmStore();
        return { userStore, postStore, postComment, prayerAlarm }
    },
    data() {
        return {
            showUser: true,
            showPost: false,
            showPostComment: false,
            showUserActive: true,
            showPostActive: false,
            showPostCommentActive: false,
        }
    },
    methods: {
        resetDisplay() {
            this.showUser = false;
            this.showPost = false;
            this.showPostComment = false;
            this.showUserActive = false;
            this.showPostActive = false;
            this.showPostCommentActive = false;
        },
        displayUser() {
            console.log(this.prayerAlarm.getPrayerAlarm);
            this.resetDisplay();
            this.showUserActive = true;
            this.showUser = true;
        },
        displayPost() {
            this.resetDisplay();
            this.showPostActive = true;
            this.showPost = true;
        },
        displayPostComment() {
            this.resetDisplay();
            this.showPostCommentActive = true;
            this.showPostComment = true;
        },
        deleteUser() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: "delete",
                        url: "http://localhost/api/post_comment/1",
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })
                        .catch((err) => Swal.fire({
                            title: 'Error!',
                            text: 'An error happen',
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        }));
                }
            })
        },
        deletePost(postId: number) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: "delete",
                        url: "http://localhost/api/post/" + postId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })
                        .catch((err) => Swal.fire({
                            title: 'Error!',
                            text: 'An error happen',
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        }));
                }
            })
        },
    },
};
</script>

<template>
    <div class="row p-1">
        <div class="col-12">
            <div id="tabs">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showUserActive }" href="#user" @click="displayUser()">User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPostActive }" href="#post" @click="displayPost()">Post</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPostComment }" href="#postComment"
                            @click="displayPostComment()">Post Comments</a>
                    </li>
                </ul>
                <div v-if="showUser" class="shadow border border-top-0 p-3 overflow-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Activity</th>
                                <th scope="col">Terminate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in userStore.getUser">
                                <th scope="row">{{ user.id }}</th>
                                <td> {{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.role.role }}</td>
                                <td><a class=" text-light btn btn-info" href="#">View activity</a></td>
                                <td><button type="button" @click="deleteUser()" class="btn btn-danger">Terminate</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="showPost" class="shadow border border-top-0 p-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Description</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="post in postStore.getPosts">
                                <th scope="row">{{ post.id }}</th>
                                <td> {{ post.user.name }}</td>
                                <td>{{ post.user.email }}</td>
                                <td>{{ post.description }}</td>
                                <td><button type="button" class="btn btn-danger"
                                        @click="deletePost(post.id)">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="showPostComment" class="shadow border border-top-0 p-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Post link</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="postCommentt in postComment.getPostComment">
                                <th scope="row">{{ postComment.id }}</th>
                                <td> {{ postCommentt.user.name }}</td>
                                <td>{{ postCommentt.user.email }}</td>
                                <td>{{ postCommentt.comment }}</td>
                                <td><a href="#">{{ postCommentt.post.description }}</a></td>
                                <td><button type="button" class="btn btn-danger">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
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
