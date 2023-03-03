<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { usePostStore } from "../stores/posts";
import { useUserStore } from "../stores/user";
import { usePostCommentStore } from "../stores/postComments";
import { usePrayerAlarmStore } from "../stores/prayerAlarm";
import { useRoleStore } from "../stores/role";
import { useEventStore } from "../stores/event";
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
            errorMessage: "",
        }
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
                .catch((err) => {
                    this.errorMessage = "An error occurred  while trying to fetch users"
                });
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
                    this.postComment.setPostComment(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchPrayerAlarm() {
            axios({
                method: "get",
                url: "http://localhost/api/prayer_alarm",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.prayerAlarm.setPrayerAlarm(res.data);
                })
                .catch((err) => console.log(err));
        },
        async fetchEvents() {
            axios({
                method: "get",
                url: "http://localhost/api/event/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.event.setEvent(res.data);
                })
                .catch((err) => {
                    this.errorMessage = "An error occurred  while trying to fetch users"
                });
        },
        async fetchRole() {
            axios({
                method: "get",
                url: "http://localhost/api/role/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
            })
                .then((res) => {
                    this.role.setRole(res.data);
                })
                .catch((err) => {
                    this.errorMessage = "An error occurred  while trying to fetch users"
                });
        },
    },
    created() {
        Promise.all([this.fetchAllUsers(), this.fetchAllPosts(), this.fetchAllPostComments(), this.fetchPrayerAlarm(), this.fetchEvents(), this.fetchRole()]).then((res) => { });
    }
};
</script>

<template></template>

<style></style>
