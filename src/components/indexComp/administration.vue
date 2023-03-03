<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { usePostStore } from "../../stores/posts";
import { useUserStore } from "../../stores/user";
import { usePostCommentStore } from "../../stores/postComments";
import { usePrayerAlarmStore } from "../../stores/prayerAlarm";
import { useRoleStore } from "../../stores/role";
import { useEventStore } from "../../stores/event";
export default {
    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const postComment = usePostCommentStore();
        const prayerAlarm = usePrayerAlarmStore();
        const role = useRoleStore();
        const event = useEventStore();
        return { userStore, postStore, postComment, prayerAlarm, role, event }
    },
    data() {
        return {
            showUser: true,
            showPost: false,
            showPostComment: false,
            showPrayerAlarm: false,
            showRole: false,
            showEvent: false,
            alarmName: "",
            errorMessage: "",
        }
    },
    methods: {
        resetDisplay() {
            this.showUser = false;
            this.showPost = false;
            this.showPostComment = false;
            this.showPrayerAlarm = false;
            this.showRole = false;
            this.showEvent = false;
        },
        displayUser() {
            this.resetDisplay();
            this.showUser = true;
        },
        displayPost() {
            this.resetDisplay();
            this.showPost = true;
        },
        displayPostComment() {
            this.resetDisplay();
            this.showPostComment = true;
        },
        displayPrayerAlarm() {
            this.resetDisplay();
            this.showPrayerAlarm = true;
        },
        displayRole() {
            this.resetDisplay();
            this.showRole = true;
        },
        displayEvent() {
            this.resetDisplay();
            this.showEvent = true;
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
                                'User has been deleted.',
                                'success'
                            )
                        })
                        .catch((err) => Swal.fire({
                            title: 'Error!',
                            text: 'An error happen when trying to delete the user',
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        }));
                }
            })
        },
        deletePost(postId: number, username: string) {
            Swal.fire({
                title: 'Delete ' + username + "'s post",
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
        deleteComment(commentId: number, username: string) {
            Swal.fire({
                title: 'Delete ' + username + "'s comment",
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
                        url: "http://localhost/api/post_comment/" + commentId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Comment has been deleted.',
                                'success'
                            )
                        })
                        .catch((err) => Swal.fire({
                            title: 'Error!',
                            text: 'An error happen trying to delete the comment',
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        }));
                }
            })
        },
        async createPrayerAlarm() {
      axios({
        method: "post",
        url: "http://localhost/api/prayer_alarm/",
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
        data: {
            prayerAlarm: this.alarmName
        },
      })
        .then((res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          });

          Toast.fire({
            icon: 'success',
            title: 'Success Alarm created'
          })
        })
        .catch((err) => {console.log(err)});
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
                        <a class="nav-link" :class="{ active: showUser }" href="#" @click="displayUser()">User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPost }" href="#" @click="displayPost()">Post</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPostComment }" href="#"
                            @click="displayPostComment()">Post Comments</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showPrayerAlarm }" href="#"
                            @click="displayPrayerAlarm()">Prayer alarm</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showRole }" href="#"
                            @click="displayRole()">Role</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: showEvent }" href="#"
                            @click="displayEvent()">Event</a>
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
                                        @click="deletePost(post.id, post.user.name)">Delete</button></td>
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
                                <th scope="row">{{ postCommentt.id }}</th>
                                <td> {{ postCommentt.user.name }}</td>
                                <td>{{ postCommentt.user.email }}</td>
                                <td>{{ postCommentt.comment }}</td>
                                <td><a href="#">{{ postCommentt.post.description }}</a></td>
                                <td><button type="button" class="btn btn-danger" @click="deleteComment(postCommentt.id, postCommentt.user.name)">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="showPrayerAlarm" class="shadow border border-top-0 p-3 overflow-auto">
                    <div class="row">
                        <div class="col-6">
                            <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="alarm in prayerAlarm.getPrayerAlarm">
                                <th scope="row">{{ alarm.id }}</th>
                                <td> {{ alarm.prayerAlarm }}</td>
                                <td><button type="button" class="btn btn-danger" @click="deleteComment(postCommentt.id, postCommentt.user.name)">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                        </div>
                        <div class="col-6">
                            <label for="name">Alarm name</label>
                            <input class="form-control" id="name"  v-model="alarmName"  placeholder="Enter email">
                            <button type="submit" class="btn btn-info mt-3 text-white">Create Alarm</button>
                        </div>
                    </div>
                </div>
                <div v-if="showRole" class="shadow border border-top-0 p-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rolee in role.getRole">
                                <th scope="row">{{ rolee.id }}</th>
                                <td> {{ rolee.role }}</td>
                                <td><a class=" text-light btn btn-info" href="#">Edit</a></td>
                                <td><button type="button" @click="deleteUser()" class="btn btn-danger">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="showEvent" class="shadow border border-top-0 p-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Event date</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="eventt in event.getEvent">
                                <th scope="row">{{ eventt.id }}</th>
                                <td> {{ eventt.name }}</td>
                                <td>{{ eventt.eventDate }}</td>
                                <td>{{ eventt.eventFrom }}</td>
                                <td>{{ eventt.eventTo }}</td>
                                <td><button type="button" class="btn btn-info text-white" @click="deleteComment(postCommentt.id, postCommentt.user.name)">Edit</button></td>
                                <td><button type="button" class="btn btn-danger" @click="deleteComment(postCommentt.id, postCommentt.user.name)">Delete</button></td>
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
